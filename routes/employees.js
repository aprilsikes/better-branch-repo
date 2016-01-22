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

router.get('/:id/employees/new', function (req, res, next) {
  Restaurants().where('id', req.params.id).first().then(function (results) {
    res.render('employees/new', {restaurant: results});
  });
});

router.post('/:id', function (req, res, next) {

  var employee = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    position: req.body.position,
    restaurant_id: req.params.id
  };

  Employees().insert(employee).then(function (results) {
    res.redirect('/:id');
  });
});

router.get('/:restaurant_id/employees/:id/edit', function (req, res, next) {
  Restaurants().where('id', req.params.restaurant_id).first().then(function (results) {
    Employees().where('id', req.params.id).first().then(function (payload) {
      res.render('employees/edit', {restaurant: results, employees: payload})
    });
  });
});

router.post('/:restaurant_id/employees/:id/update', function (req, res, next) {
  Restaurants().where('id', req.params.restaurant_id).first().then(function (results) {
    Employees().where('id', req.params.id).update(req.body).then(function (payload) {
      res.redirect('/restaurants/'+req.params.restaurant_id);
    });
  });
});

router.get('/:restaurant_id/employees/:id/delete', function (req, res, next) {
  Restaurants().where('id', req.params.restaurant_id).first().then(function (results) {
    Employees().where('id', req.params.id).del().then(function (payload) {
      res.render('/restaurants');
    });
  });
});

module.exports = router;
