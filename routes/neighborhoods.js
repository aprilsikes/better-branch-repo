var express = require('express');
var router = express.Router();
var app = express();
var knex = require('../db/knex');

function Neighborhoods() {
  return knex('neighborhoods');
}

function Restaurants() {
  return knex('restaurants');
}

module.exports = router;
