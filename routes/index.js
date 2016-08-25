var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  err = req.session.error
  req.session.error = undefined; // remove from further requests
  res.render('index', { error: err });
});

module.exports = router;
