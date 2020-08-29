import RequestService from '../services/RequestServices.js';
import reqResponse from '../helpers/responseHandler.js';
import Joi from 'joi';
const requestStatus = ['REJECTED', 'APPROVED']


const RequestController = {
  getRequests: async(req,res) => {
    RequestService.getRequests(req.query)
    .then(result => {
      return res.status(201).send(reqResponse.sucessResponse(201, "", result))
    })
    .catch(err => {
      const { output } = err;
      return res.status(502).send(reqResponse.errorResponse(output.statusCode, output.payload.message))
    })
  },
  createRequest: async(req,res) => {
    const requestSchema = Joi.object({
      departmentId: Joi.string().required(),
      allocatedUserId: Joi.string().required(),
      ownerId: Joi.string().required(),
      message: Joi.string().required(),
      status: Joi.string().required().valid('PENDING'),
    })
    const result = requestSchema.validate(req.body);
    const { error }  = result;
    if (error) {
      const message = error.details[0].message;
      return res.status(402).send(reqResponse.errorResponse(402, message));
    }
    RequestService.createRequest(req.body)
    .then(result => {
      return res.status(201).send(reqResponse.sucessResponse(201, "Request created Successfully", result));
    })
    .catch(err => {
      const { output } = err;
      return res.status(502).send(reqResponse.errorResponse(output.statusCode, output.payload.message));
    })
  },
  updateRequest: async(req,res) => {
    const requestSchema = Joi.object({
      id: Joi.string().required(),
      status: Joi.string().required().valid(...requestStatus),
      reason: Joi.string().optional(),
    })
    const result = requestSchema.validate(req.body);
    const { error }  = result;
    if (error) {
      const message = error.details[0].message;
      return res.status(402).send(reqResponse.errorResponse(402, message));
    }
    RequestService.updateRequest(req.body)
    .then(result => {
      return res.status(201).send(reqResponse.sucessResponse(201, "Request updated Successfully", result));
    })
    .catch(err => {
      const { output } = err;
      return res.status(502).send(reqResponse.errorResponse(output.statusCode, output.payload.message));
    })
  },
}

export default RequestController;