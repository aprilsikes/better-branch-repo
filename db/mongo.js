var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants_development');

var Schema = mongoose.Schema;

var Restaurants = new Schema({
  name: String,
  location: String,
  created_at: Date,
  updated_at: Date
});

var RestaurantsModel = mongoose.model('Restaurants', Restaurants);

router.get('/', function(req, res, next){
	return RestaurantsModel.find(function (restaurants) {
			res.render('restaurants/restIndex', {restaurants: restaurants});
	});
});

router.get('/new', function(req, res, next){
	res.render('restaurants/RestNew')
});

router.post('/', function (req, res, next) {
  restaurant = new RestaurantsModel{
    name: req.body.name,
    location: req.body.location
  };

  restaurant.save(function () {
	   res.redirect('/restaurants');
  });

});
