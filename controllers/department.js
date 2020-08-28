import DepartmentService from '../services/DepartmentServices.js';
import reqResponse from '../helpers/responseHandler.js';
import Joi from 'joi';

const departmentController = {
  getDepartment: async(req,res) => {
    DepartmentService.getDepartment(req.query)
    .then(result => {
      return res.status(201).send(reqResponse.sucessResponse(201, " ", result));
    })
    .catch(err => {
      const { output } = err;
      return res.status(502).send(reqResponse.errorResponse(output.statusCode, output.payload.message));
    })
  },
  createDepartment: async(req,res) => {
    const departmentSchema = Joi.object({
      departmentName: Joi.string().required(),
    })
    const result = departmentSchema.validate(req.body); 
    const { error} = result;
    if (error) {
      const message = error.details[0].message;
      return res.status(402).send(reqResponse.errorResponse(402, message));
    }
    DepartmentService.createDepartment(req.body)
    .then(result => {
      return res.status(201).send(reqResponse.sucessResponse(201, "Department Created Successfully", result));
    })
    .catch(err => {
      console.log(err)
      const { output } = err;
      return res.status(502).send(reqResponse.errorResponse(output.statusCode, output.payload.message));
    })
  },
  updateDepartment: async(req,res) => {

  },
  deleteDepartment: async(req, res) => {
    
  }
}

export default departmentController;