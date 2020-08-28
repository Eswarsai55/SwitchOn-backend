import Request from '../database/request.js';
import Boom from 'boom';
import async from 'async';

const RequestServices = {
  getRequests: async(data) => {
    const { id } = data;
    if (id) {
      return Request.findById(id);
    }
    return Request.find({})
  },
  createRequest: (data) => {
    return new Promise((resolve, reject) => {
      async.auto({
        saveRequest: async.asyncify(() => {
          const requestData = new Request(data);
          return requestData.save();
        })
      }, (err, results) => {
        if (err) {
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve(results.saveRequest);
      })
    })
  },
  updateRequest: (data) => {
    return new Promise((resolve, reject) => {
      const { id } = data;
      async.auto({
        request: async.asyncify(() => {
          return Request.findById(id).then(request => request);
        }),
        updateRequest: ['request', async.asyncify((results) => {
          const { request } = results;
          if (request) {
            if (data.status === 'REJECTED' && !data.reason) {
              return Promise.reject(Boom.badRequest("Provide reason for rejecting request"));
            }
            data.modifiedOn = Date.now();
            return Request.findByIdAndUpdate(id, data);
          }
          return Promise.reject(Boom.badRequest('Request not found'));
        })],
        updatedRequest: ['updateRequest', async.asyncify((results) => {
          const { updateRequest } = results;
          if (updateRequest) {
            return Request.findById(id).then(request => request);
          }
        })]
      }, (err, results) => {
        if (err) {
          return reject(err.isBoom ? err : Boom.boomify(err));
        }
        return resolve(results.updatedRequest)
      })
    })
  }
}

export default RequestServices;