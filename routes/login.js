var express = require('express');
var router = express.Router();

var F1 = require("fellowshipone/index");
var request = require('request');

/* GET users listing. */
router.post('/', function(req, response, next) {
  console.log(req.body);
  var f1 = new F1({
    apiURL: req.app.get('config')["apiURL"],
    username: req.body["username"],
    password: req.body["password"],
    oauth_credentials: {
      consumer_key: req.app.get('config')["oauth_credentials"]["consumer_key"],
      consumer_secret: req.app.get('config')["oauth_credentials"]["consumer_secret"]
    }
  })
  f1.get_token(function (err, oauth_credentials, userURL) {
    if (typeof err == 'undefined') {
      request.get(userURL, { oauth: oauth_credentials, json: true }, function (err, res, body) {
        console.log('hi there, %s %s', err, res);
        response.send(userURL);
      })
    } else {
      console.log("WE HAVE AN ERROR")
      req.session.error = err.message;
      response.redirect("/");
    }
  })


});

module.exports = router;
