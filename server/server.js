var express = require('express');
var app = express();

var db = require('./db.js');

app.use(express.static(__dirname + '/../client'));

app.get('/submissions', function(req, res) {
  if (req.query.count) {
    return res.json(db.length);
  }
  res.json(db);
});

app.get('/submissions/:id', function(req, res) {
  var id = JSON.parse(req.params.id);
  if (id < db.length && id >= 0) {
    return res.json(db[id]);
  }
  res.sendStatus(404);
});

app.listen(3000, function() {
  console.log('artRater listening on port 3000...');
});

module.exports = app;
