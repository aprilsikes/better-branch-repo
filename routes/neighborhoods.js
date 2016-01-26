var express = require('express');
var router = express.Router();
var app = express();
var knex = require('../db/knex');
var request = require('request');


function Neighborhoods() {
  return knex('neighborhoods');
}

function Restaurants() {
  return knex('restaurants');
}

/* GET home page. */
router.get('/:id', function(req, res, next) {
  Neighborhoods().where('id', req.params.id).first().then(function (results) {
    var google_api = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    var my_key ='&key='+'AIzaSyBo3qt_yoDV6muFVcMa96dDSGG7e6CrIyU';
    var address = results.epicenter;

    address = address.split(' ');
    address = address.join('+');
    request(google_api+address+my_key, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var jase = JSON.parse(body);
        var lat_long = jase.results[0].geometry.location;
        res.render('neighborhoods/show', {title: 'Express', lat_long : lat_long, neighborhoods: results});
      }
    });
  });
});

router.get('/', function (req, res, next) {
  Neighborhoods().select().then(function (results) {
    res.render('neighborhoods/index', {neighborhoods: results});
  });
});

module.exports = router;
