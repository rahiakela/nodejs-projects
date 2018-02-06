let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let userRouter = require('./routes/routes-crud-api');
let indexRouter = require('./routes/index');


let app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', userRouter);

// Generic error handler
app.use((err, req, res, next) => {
  console.error("--- Error encountered ---");
  console.log(err);

  res.status(500).json({
    msg: err,
    error: true
  });
});

mongoose.connect('mongodb://localhost/test-chapter4');
let db = mongoose.connection;
db.once('open', () => {
  console.log('Database connection established...');
  app.listen(3000, () => {
    console.log("Server started ...");
  });
});

