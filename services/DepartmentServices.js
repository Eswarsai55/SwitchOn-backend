import Department from '../database/department.js';
import async from 'async';
import Boom from 'boom';

const departmentService = {
  getDepartment: async(data) => {
    const { id } = data;
    if (id) {
      return Department.findById(id);
    } else {
      return Department.find({});
    }
  },
  createDepartment: async(data) => {
    return new Promise((resolve, reject) => {
      const { departmentName } = data;
      async.auto({
        duplicateDepartment: async.asyncify(() => {
          return Department.find({departmentName:{$regex:departmentName, $options: 'i'}})
        }),
        saveDepartment: ['duplicateDepartment', async.asyncify((results) => {
          const { duplicateDepartment } = results;
          if (!duplicateDepartment.length) {
            const departmentData = new Department(data);
            return departmentData.save();
          } else {
            return Promise.reject(Boom.badRequest('Department name already exists'))
          }
        })],
      }, (err,results) => {
        if (err) {
          return reject(err.isBoom ? err : Boom.boomify(err))
        }
        return resolve(results.saveDepartment)
      })
    })
  },
  updateDepartment: async() => {

  },
  deleteDepartment: async() => {

  }

}

export default departmentService;