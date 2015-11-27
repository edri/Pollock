var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Polls = require('../models/polls');

/*
* Connect to Pollock's mongoose database, and get the polls' model when done.
*/
var uri;
if (process.env.MONGOLAB_URI) {
	// For heroku
	uri = process.env.MONGOLAB_URI + '/pollock';
} else {
	uri = "mongodb://localhost"; // Dev path
}
mongoose.connect(uri, function(error) {
	if(error) {
		console.log(error);
	} else {
		console.log("Connected to database.");
	}
});

/*
* GET home page.
*/
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Pollock' });
});

module.exports = router;
