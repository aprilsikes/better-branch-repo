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

var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/neighborhoods/:id', function(req, res, next) {

  Neighborhoods().where('id', req.params.id).first().then(function (results) {

    var google_api = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    var address = results.epicenter
    var my_key ='&key='+'AIzaSyBo3qt_yoDV6muFVcMa96dDSGG7e6CrIyU';
    request(google_api+my_key+address, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var jase = JSON.parse(body);
        var lat_long = jase.results[0].geometry.location;
        console.log(jase.results[0].geometry.location);
        res.render('neighborhoods/show', { title: 'Express', lat_long : lat_long });
      }
      });
  });


});

module.exports = router;
