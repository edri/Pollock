var express = require('express');
var router = express.Router();

var Polls = require('../models/polls');

/*
* Return the first day of the current week as a date.
*/
function getTheFirstDayOfTheCurrentWeek() {
	// Get current date.
	var currentDate = new Date();
	// Calculate the first day of the week.
	var first = currentDate.getDate() - 7;
	// Return the new calculated date.
	return new Date(currentDate.setDate(first));
}

/* GET users listing. */
router.get('/home', function (req, res, next) {
	// Get the all created polls.
	Polls.count({}, function (err, totalNumberOfPolls) {
		// Get polls created this week.
		Polls.count({creationDate: {"$gte": getTheFirstDayOfTheCurrentWeek(), "$lte": Date.now()}}, function(err, numberOfPollsCreatedThisWeek) {
			// Get polls that are still open.
			Polls.count({state: "Open"}, function(err, numberOfPollsStillOpen) {
				if (err) {
					// Calls the view, indicating there is an error.
					res.render('components/home', { title: 'Pollock', error: "Can't get total of polls." });
				}
				else {
					// Calls the view, indicating the calculated stats.
					res.render('components/home',
								{ title: 'Pollock',
									totalNumberOfPolls: totalNumberOfPolls,
									numberOfPollsCreatedThisWeek: numberOfPollsCreatedThisWeek,
									numberOfPollsStillOpen: numberOfPollsStillOpen
								});
				}
			});
		});
	});
});

router.get('/signin', function (req, res) {
	res.render('components/signin');
});

router.get('/signup', function (req, res) {
	res.render('components/signup');
});

router.get('/action', function (req, res) {
	res.render('components/action');
});

router.get('/editor', function (req, res) {
	res.render('components/editor');
});

router.get('/participate', function (req, res) {
	res.render('components/participate');
});

router.get('/pollslist', function (req, res, next) {
	var pollsStream = Polls.find({}).lean().exec(function(err, polls) {
		if (err) {
			console.log("ERROR: " + err);
			res.render('components/pollslist', { error: "Can't get polls list." });
		}
		else {
			res.render('components/pollslist', { polls: polls });
		}
	});
});

router.get('/stats', function (req, res) {
	res.render('components/stats');
});

module.exports = router;
