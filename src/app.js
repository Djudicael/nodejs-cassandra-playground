const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const UserRouter = require('./router/UserRouter');
const ShoutRouter = require('./router/ShoutRouter');
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/shouts', ShoutRouter);

module.exports = app;