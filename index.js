import express from 'express';
import bodyParser from 'body-parser';
import Dotenv from 'dotenv';

import {connectDb}  from './database/index.js';
import routes from './routes/index.js';


let app = express();
const envFilePath = process.env.APP_ROOT_PATH + "/.env";
try {
  Dotenv.config(envFilePath);
} catch (e){
  throw new Error("Missing .env file. please refer Readme.md");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(routes);

const port = process.env.NODE_ENV || 3000;

connectDb();

app.listen(port, () => console.log(`Running on localhost ${port}`));