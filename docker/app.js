const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const opn = require('opn');
const ip = require('ip');
const app = express();

// view engine setup

app
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(favicon(path.join(__dirname, '/public/img/favicon.ico')))
  .use(logger('dev'))
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  .use(cookieParser())
  .use(express.static(path.join(__dirname, 'public')))
  .use('/', routes);

const server = http.Server(app);
const io = socketio.listen(server);
const port = process.env.PORT || process.env.VCAP_APP_PORT || 5001;

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});

// if you're running on something other than localhost, set your valid server name to listen on here!
io.set('origins', '*:*');
io.sockets.on('connection', socket => {
  socket.emit('message', 'Welcome to Revealer');
  socket.on('slidechanged', data => {
    socket.broadcast.emit('slidechanged', data);
  });
});

server.listen(port, '0.0.0.0', () => {
  const localAddress = `127.0.0.1:${port}`;
  const remoteAddress = `${ip.address()}:${port}`;
  console.log('Express server listening on', localAddress);
  console.log('Remote server listening on', remoteAddress);
  console.log('Opening browser');
  opn(`http://127.0.0.1:${port}/control`);
});

module.exports = app;
