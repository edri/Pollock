var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/*
* Return the first day of the current week as a date.
*/
function getFirstDayOfCurrentWeek() {
	// Get current date.
	var currentDate = new Date;
	// Calculate the first day of the week.
	var first = currentDate.getDate() - currentDate.getDay() + 1;
	// Return the new calculated date.
	return new Date(currentDate.setDate(first));
}

/*
* Connect to Pollock's mongoose database, and get the polls' model when done.
*/
mongoose.connect('mongodb://localhost/pollock', function(error) {
	if(error) {
		console.log(error);
	} else {
		console.log("Connected to database.");

		// Create polls' schema.
		var pollsSchema = new mongoose.Schema({
			title: String,
			creationDate: Date,
			state: String,
			questions: [{
				title: String,
				type: {type: String},
				choices: [{
					key: String,
					text: String,
					participations: [{
						participant: String,
						submissionDate: Date
					}]
				}]
			}]
		});

		// Get the polls' model.
		Polls = mongoose.model("polls", pollsSchema);
	}
});

/*
* GET home page.
*/
router.get('/', function(req, res, next) {
	// Get the all created polls.
	Polls.count({}, function(err, totalNumberOfPolls) {
		// Get polls created this week.
		Polls.count({creationDate: {"$gte": getFirstDayOfCurrentWeek(), "$lte": Date.now()}}, function(err, numberOfPollsCreatedThisWeek) {
			// Get polls that are still open.
			Polls.count({state: "Open"}, function(err, numberOfPollsStillOpen) {
				if (err) {
					// Calls the view, indicating there is an error.
					res.render('index', { title: 'Pollock', error: "Can't get total of polls." });
				}
				else {
					// Calls the view, indicating the calculated stats.
					res.render('index',
								{ title: 'Pollock',
									totalNumberOfPolls: totalNumberOfPolls,
									numberOfPollsCreatedThisWeek: numberOfPollsCreatedThisWeek,
									numberOfPollsStillOpen: numberOfPollsStillOpen
								});
				}
			})
		})
	});
});

module.exports = router;
