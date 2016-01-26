var express = require('express');
var router = express.Router();
var app = express();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/restaurants');
});

module.exports = router;
