/// <reference path="../typings/tsd.d.ts" />
'use strict';
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Polls = require('../models/polls');
//
// /*
// * Return the first day of the current week as a date.
// */
// function getTheFirstDayOfTheCurrentWeek() {
// 	// Get current date.
// 	var currentDate = new Date();
// 	// Calculate the first day of the week.
// 	var first = currentDate.getDate() - 7;
// 	// Return the new calculated date.
// 	return new Date(currentDate.setDate(first));
// }
//
// /*
// * Connect to Pollock's mongoose database, and get the polls' model when done.
// */
// // process.env.MONGOLAB_URI = "mongodb://localhost"; // Dev path
// mongoose.connect(process.env.MONGOLAB_URI + '/pollock', function(error) {
// // mongoose.connect(process.env.MONGOLAB_URI + '/pollock', function(error) {
// 	if(error) {
// 		console.log(error);
// 	} else {
// 		console.log("Connected to database.");
// 	}
// });
//
// /*
// * GET home page.
// */
// router.get('/', function(req, res, next) {
// 	console.log(getTheFirstDayOfTheCurrentWeek());
//
// 	// Get the all created polls.
// 	Polls.count({}, function(err, totalNumberOfPolls) {
// 		// Get polls created this week.
// 		Polls.count({creationDate: {"$gte": getTheFirstDayOfTheCurrentWeek(), "$lte": Date.now()}}, function(err, numberOfPollsCreatedThisWeek) {
// 			// Get polls that are still open.
// 			Polls.count({state: "Open"}, function(err, numberOfPollsStillOpen) {
// 				if (err) {
// 					// Calls the view, indicating there is an error.
// 					res.render('index', { title: 'Pollock', error: "Can't get total of polls." });
// 				}
// 				else {
// 					// Calls the view, indicating the calculated stats.
// 					res.render('index',
// 								{ title: 'Pollock',
// 									totalNumberOfPolls: totalNumberOfPolls,
// 									numberOfPollsCreatedThisWeek: numberOfPollsCreatedThisWeek,
// 									numberOfPollsStillOpen: numberOfPollsStillOpen
// 								});
// 				}
// 			});
// 		});
// 	});
// });
var IndexRoutes = (function () {
    function IndexRoutes() {
    }
    IndexRoutes.init = function (router) {
        router
            .route('/')
            .get(function (req, res) {
            console.log("OKOK");
        });
    };
    return IndexRoutes;
})();
exports.IndexRoutes = IndexRoutes;
//# sourceMappingURL=index.js.map