var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.put('/submissions/:id', function(req, res) {
  var rating = JSON.parse(req.body.rating);
  var id = JSON.parse(req.params.id);
  if (id < db.length && id >= 0 && rating >=1 && rating <= 5) {
    var item = db[id];
    item.average_rating = (item.average_rating * item.number_ratings + rating) / (item.number_ratings + 1);
    item.number_ratings++;
    return res.sendStatus(200);
  }
  res.sendStatus(404);
});

app.listen(3000, function() {
  console.log('artRater listening on port 3000...');
});

module.exports = app;
