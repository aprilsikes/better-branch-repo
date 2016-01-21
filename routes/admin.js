var express = require('express');
var router = express.Router();
var app = express();
var knex = require('../db/knex');

function Restaurants() {
  return knex('restaurants');
}

router.get('/restaurants/admin', function (req, res, next) {
  Restaurants().select().then(function (results) {
    res.render('restaurants/admin', {restaurants: results});
  });
});

module.exports = router;
