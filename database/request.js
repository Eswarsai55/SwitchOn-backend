import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  modifiedOn: {
    type: Date,
    default: Date.now()
  },
  reason: {
    type: String
  },
  allocatedUserId: {
    type: String,
    required: true
  },
  departmentId: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED']
  }
}, {collection: 'Request'})

const requestModel = mongoose.model('Request', requestSchema);

export default requestModel;