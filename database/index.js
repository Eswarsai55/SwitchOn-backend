import mongoose from 'mongoose';

export const connectDb = () =>  {
  return new Promise((resolve, reject) => {
    const {DB_USERNAME, DB_PASSWORD, MONGO_DB_HOST, MONGO_DB_PORT, AUTHENTICATION_DB} = process.env;
    mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${AUTHENTICATION_DB}?authSource=admin`,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
      console.log('Database connection Successfull');
      return resolve(result)
    }).catch(err => {
      console.log('Database connection error', err);
      return reject(err);
    })
  })
}