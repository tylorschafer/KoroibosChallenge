var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];

var indexRouter = require('./controllers/index');
var olympiansRouter = require('./controllers/api/v1/olympiansController')
var olympianStatsRouter = require('./controllers/api/v1/olympianStatsController')
var eventsRouter = require('./controllers/api/v1/eventsController')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/olympians', olympiansRouter)
app.use('/api/v1/olympian_stats', olympianStatsRouter)
app.use('/api/v1/events', eventsRouter)
app.use('/api/v1/events', eventsRouter)

module.exports = app;
