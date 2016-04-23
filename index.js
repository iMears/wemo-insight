var http   = require('http');
var Wemo   = require('wemo-client');
var wemo   = new Wemo();
var jsome  = require('jsome');
var client;

wemo.discover(function(deviceInfo) {
  client = wemo.client(deviceInfo);
  client.on('binaryState', function(value) {
    console.log('Binary State changed to: %s', value);
  });
});

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/on', function(req, res) {
  console.log('turning on...');
  client.setBinaryState(1);
})

app.get('/off', function(req, res) {
  console.log('turning off...');
  client.setBinaryState(0);
})

// // POST /login gets urlencoded bodies
// app.post('/login', urlencodedParser, function(req, res) {
//   if (!req.body) return res.sendStatus(400)
//   res.send('welcome, ' + req.body.username)
// })

// // POST /api/users gets JSON bodies
// app.post('/api/users', jsonParser, function(req, res) {
//   if (!req.body) return res.sendStatus(400)
//   // create user in req.body
// })

app.listen(ENV['PORT'] || 8080, function() {
  console.log('Listening on port 8080...');
});