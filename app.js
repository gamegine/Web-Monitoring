var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stylus = require('stylus');

var indexRouter = require('./routes/index').router;
var usersRouter = require('./routes/users');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next){
 res.io = io;
 next();
});
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

io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    var test = require('./routes/index')
    socket.emit('message', 'Vous êtes bien connecté !');

    setInterval(function(){
        Promise.all([test.c(test.cpu), test.c(test.ram), test.c(test.mem)]).then(function(data) {
            socket.emit('update',{"cpu":JSON.parse(data[0]),"ram":JSON.parse(data[1]),"mem":JSON.parse(data[2])});
        })
    }, 1000);
});

module.exports = {app:app, server:server};
