// REFACTORING: It is recommended to use const and let for better scoping and to avoid potential issues.
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const todosRouter = require('./routes/todos');

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todos', todosRouter);

// catch 404 and forward to error handler
// REFACTORING: Provided named functions to improve readability and make stack traces more informative.
app.use(function handleNotFound(req, res, next) {
  next(createError(404));
});

// error handler
// REFACTORING: Provided named functions to improve readability and make stack traces more informative.
app.use(function handleError(err, req, res, next) {
  next(createError(err.status || 500));
});

module.exports = app;
