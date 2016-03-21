var express = require('express');
var router = express.Router();
var app = express();
var Rest = require('..db/mongo');



router.get('/', function (req, res, next) {
  Restaurants().select().then(function (results) {
    res.render('restaurants/index', {restaurants: results})
  });
});

router.get('/new', function (req, res, next) {
  res.render('restaurants/new');
});



router.post('/', function (req, res, next) {

  var restaurant = new Rest({
    name: req.body.name,
    location: req.body.location
  })

    Restaurants().insert(restaurant).then(function (results) {
      res.redirect('/restaurants');
  });


});

// var restaurant = new Rest({
//   name: req.body.name,
//   location: req.body.location
// });
