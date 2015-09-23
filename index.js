'use strict';

require('babel/register')({});
var http = require('http');

var app = require('./server');
const PORT = process.env.PORT || 3000;

var server = http.createServer(app).listen(PORT, function() {
  console.log('Server listening on', PORT);
});

var io = app.io
io.attach( server );