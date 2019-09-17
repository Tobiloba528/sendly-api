const Joi = require("joi");
const winston = require('winston');
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();


require('./startup/logging');
require("./startup/cors")(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 4001;
const server = app.listen(port, () =>
  winston.info(`listening to port ${port}...`)
);
