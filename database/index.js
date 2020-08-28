import mongoose from 'mongoose';

export const connectDb = () =>  {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://eswar:hBits%401234@localhost:27017/hBits?authSource=admin',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
      console.log('Database connection Successfull');
      return resolve(result)
    }).catch(err => {
      console.log('Database connection error', err);
      return reject(err);
    })
  })
}