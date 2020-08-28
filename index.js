import express from 'express';
import bodyParser from 'body-parser';

import {connectDb}  from './database/index.js';
import routes from './routes/index.js';


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(routes);

connectDb();

app.listen(5100, () => console.log('Running on localhost'));