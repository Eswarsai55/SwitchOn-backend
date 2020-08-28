import UserService from '../services/UserServices.js';
import reqResponse from '../helpers/responseHandler.js';
import Joi from 'joi';


const UserController = {
  getUser: async(req,res) => {
    UserService.getUser(req.query)
    .then(result => {
      return res.status(201).send(reqResponse.sucessResponse(201, "", result))
    })
    .catch(err => {
      const { output } = err;
      return res.status(502).send(reqResponse.errorResponse(output.statusCode, output.payload.message))
    })

  },
  createUser: async(req,res) => {
    const userSchema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      phoneNumber: Joi.number().required(),
      departmentId: Joi.string().required(),
    })
    const result = userSchema.validate(req.body);
    const { error }  = result;
    if (error) {
      const message = error.details[0].message;
      return res.status(402).send(reqResponse.errorResponse(402, message));
    }
    UserService.createUser(req.body)
    .then(result => {
      console.log(result)
      return res.status(201).send(reqResponse.sucessResponse(201, "User created Successfully", result));
    })
    .catch(err => {
      const { output } = err;
      return res.status(502).send(reqResponse.errorResponse(output.statusCode, output.payload.message));
    })
  },
  updateUser: async(req,res) => {

  },
  deleteUser: async(req, res) => {

  },
  login: async(req, res) => {
    const userSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    })
    const result = userSchema.validate(req.body);
    const { error }  = result;
    if (error) {
      const message = error.details[0].message;
      return res.status(402).send(reqResponse.errorResponse(402, message));
    }
    UserService.loginUser(req.body)
    .then(result => {
      return res.status(201).send(reqResponse.sucessResponse(201, "User login Successful", result));
    })
    .catch(err => {
      const { output } = err;
      return res.status(502).send(reqResponse.errorResponse(output.statusCode, output.payload.message));
    })
  }
}

export default UserController;