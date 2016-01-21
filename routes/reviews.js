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

router.get('/:restaurant_id/reviews/new', function (req, res, next) {
  Restaurants().where('id', req.params.restaurant_id).first().then(function (results) {
    res.render('reviews/new', {restaurant: results});
  });
});

router.post('/:restaurant_id/reviews', function (req, res, next) {

  var reviewer = {
    reviewer_name: req.body.reviewer_name,
    date: req.body.date,
    rating: req.body.rating,
    review: req.body.review,
    restaurant_id: req.params.id
  };

  Reviews().insert(reviewer).then(function (results) {
    res.redirect('/'+req.params.id);
  });
});

router.get('/:restaurant_id/reviews/:id/edit', function (req, res, next) {
  Restaurants().where('id', req.params.restaurant_id).first().then(function (results) {
    Reviews().where('id', req.params.id).first().then(function (payload) {
      res.render('reviews/edit', {restaurant: results, reviews: payload})
    });
  });
});

router.post('/:restaurant_id/reviews/:id/update', function (req, res, next) {
  Restaurants().where('id', req.params.restaurant_id).first().then(function (results) {
    Reviews().where('id', req.params.id).update(req.body).then(function (payload) {
      res.redirect('/restaurants/'+req.params.id);
    });
  });
});


module.exports = router;
