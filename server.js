var path = require('path');
var express = require('express');

var app = express();

var port = parseInt(process.env.PORT, 10) || 3000

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static('public'));

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});