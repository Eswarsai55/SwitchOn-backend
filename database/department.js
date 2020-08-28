import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    unique: true,
  }, 
}, {collection: 'Department'})

const departmentModel = mongoose.model('Department', departmentSchema);

export default departmentModel;
