const express = require('express');
const app = express();

//News
app.use('/', require('./index.routes'));
app.use('/news', require('./news.routes'));
module.exports = app;