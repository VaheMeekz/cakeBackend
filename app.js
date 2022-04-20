const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
//routers
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin')
const aboutUsRouter = require('./routes/aboutUs')
const aboutUsRouterInfo = require('./routes/aboutUsInfo')
const contactUsRouter = require('./routes/contactUs')
const subscribersRouter = require('./routes/subscribers')
const contactsRouter = require('./routes/contacts')
require('dotenv').config()

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Cake Backend API Documentation",
      description: "documents",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:5000"]
    }
  },
  // ['.routes/*.js']
  apis: ["app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use Routes
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/aboutUs', aboutUsRouter);
app.use('/api/v1/aboutUsInfo', aboutUsRouterInfo);
app.use('/api/v1/contactUs', contactUsRouter);
app.use('/api/v1/subscribers', subscribersRouter);
app.use('/api/v1/contacts', contactsRouter);

//end useRoutes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
