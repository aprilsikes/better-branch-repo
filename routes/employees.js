var express = require('express');
var router = express.Router();
var app = express();
var knex = require('../db/knex');

function Employees() {
  return knex('employees');
}

function Restaurants() {
  return knex('restaurants');
}

module.exports = router;
