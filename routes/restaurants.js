var express = require('express');
var router = express.Router();
var app = express();
var knex = require('../db/knex');

function Restaurants() {
  return knex('restaurants');
}

function Reviews() {
  return knex('reviews');
}

function Employees() {
  return knex('employees');
}

router.get('/', function (req, res, next) {
  Restaurants().select().then(function (results) {
    res.render('restaurants/index', {restaurants: results})
  });
});

router.get('/admin', function (req, res, next) {
  Restaurants().select().then(function (results) {
    res.render('restaurants/admin', {restaurants: results});
  });
});

router.get('/new', function (req, res, next) {
  res.render('restaurants/new');
});

router.post('/', function (req, res, next) {

  var restaurant = {
    name: req.body.name,
    street1: req.body.street1,
    street2: req.body.street2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    cuisine: req.body.cuisine,
    rating: req.body.rating,
    image: req.body.image,
    bio: req.body.bio,
    neighborhood_id: req.body.neighborhood
  }

  Restaurants().insert(restaurant).then(function (results) {
    res.redirect('/');
  });
});

router.get('/:id', function (req, res, next) {
  Restaurants().where('id', req.params.id).first().then(function (results) {
    Reviews().where('restaurant_id', req.params.id).then(function (payload) {
      Employees().where('restaurant_id', req.params.id).then(function (stuff) {
        res.render('restaurants/show', {restaurant: results, reviews: payload, employees: stuff});
      });
    });
  });
});

router.get('/admin', function (req, res, next) {
  Restaurants().select().then(function (results) {
    res.render('restaurants/admin', {restaurants: results});
  });
});

router.get('/:id/edit', function (req, res, next) {
  Restaurants().where('id', req.params.id).first().then(function (results) {
    res.render('restaurants/edit', {restaurant: results});
  });
});

router.post('/:id/update', function (req, res, next) {
  Restaurants().where('id', req.params.id).update(req.body).then(function (results) {
    res.redirect('/restaurants/'+req.params.id);
  });
});

router.get('/:id/delete', function (req, res, next) {
  Restaurants().where('id', req.params.id).del().then(function (results) {
    res.render('restaurants/index');
  });
});

module.exports = router;
