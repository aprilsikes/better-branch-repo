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

router.get('/:id/reviews/new', function (req, res, next) {
  Restaurants().where('id', req.params.id).first().then(function (results) {
    res.render('reviews/new', {restaurant: results});
  });
});

router.post('/:restaurant_id/reviews', function (req, res, next) {

  var reviewer = {
    reviewer_name: req.body.reviewer_name,
    date: req.body.date,
    rating_of_rest: req.body.rating_of_rest,
    review: req.body.review,
    restaurant_id: req.params.restaurant_id
  };

  Reviews().insert(reviewer).then(function (results) {
    res.redirect('/restaurants/'+req.params.restaurant_id);
  });
});

router.get('/:restaurant_id/reviews/:id/edit', function (req, res, next) {
  Restaurants().where('id', req.params.restaurant_id).first().then(function (results) {
    Reviews().where('id', req.params.id).first().then(function (payload) {
      res.render('reviews/edit', {restaurant: results, review: payload})
    });
  });
});

router.post('/:restaurant_id/reviews/:id', function (req, res, next) {
  Reviews().where('id', req.params.id).update(req.body).then(function (payload) {
    res.redirect('/restaurants/'+req.params.restaurant_id);
  });
});

router.get('/:restaurant_id/reviews/:id/delete', function (req, res, next) {
  Restaurants().where('id', req.params.restaurant_id).first().then(function (results) {
    Reviews().where('id', req.params.id).del().then(function (payload) {
      res.render('/restaurants/show');
    });
  });
});


module.exports = router;
