var express = require('express');
var router = express.Router();
var app = express();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Welcome to My Restaurant Guide'});
});

module.exports = router;
