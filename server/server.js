var express = require('express');
var app = express();

var db = require('./db.js');

app.use(express.static(__dirname + '/../client'));

app.listen(3000, function() {
  console.log('artRater listening on port 3000...');
});

module.exports = app;
