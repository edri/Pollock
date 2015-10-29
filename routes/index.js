var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost/test', function(error) {
	if(error) {
		console.log(error);
	} else {
		console.log("Connected to database.");
	}
});

var Schema = mongoose.Schema;

var pollsSchema = new Schema({
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

var Polls = mongoose.model("polls", pollsSchema);
// Clean the model.
Polls.remove({}, function(err) {
	console.log("Database cleared.\nCreating some test objects...");

	var data = [
		{
			title: "Test1",
			creationDate: Date.now(),
			state: "Open",
			questions: [
				{
					title: "Q1",
					type: "Easy",
					choices : [
						{
							key: "R1",
							text: "La réponse 1."
						},
						{
							key: "R2",
							text: "La réponse 2."
						}
					]
				}
			]
		},
		{
			title: "Test2",
			creationDate: new Date(2015, 3, 29, 14, 54, 59, 0),
			state: "Close",
			questions: [
				{
					title: "Q1",
					type: "Easy",
					choices : [
						{
							key: "R1",
							text: "La réponse 1."
						},
						{
							key: "R2",
							text: "La réponse 2."
						}
					]
				}
			]
		},
		{
			title: "Test3",
			creationDate: Date.now(),
			state: "Close",
			questions: [
				{
					title: "Q1",
					type: "Easy",
					choices : [
						{
							key: "R1",
							text: "La réponse 1."
						},
						{
							key: "R2",
							text: "La réponse 2."
						}
					]
				}
			]
		}
	];

	Polls.create(data, function (err) {
		if (err) console.log("Error on save : " + err);
	});
})

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

/* GET home page. */
router.get('/', function(req, res, next) {
	// Get the all created polls.
	Polls.count({}, function(err, totalNumberOfPolls) {
		// Get polls created this week.
		Polls.count({creationDate: {"$gte": getFirstDayOfCurrentWeek(), "$lte": Date.now()}}, function(err, numberOfPollsCreatedThisWeek) {
			// Get polls that are still open.
			Polls.count({state: "Open"}, function(err, numberOfPollsStillOpen) {
				console.log("1 : " + totalNumberOfPolls);
				console.log("2 : " + numberOfPollsCreatedThisWeek);
				console.log("3 : " + numberOfPollsStillOpen);

				if (err) {
					res.render('index', { title: 'Pollock', error: "Can't get total of polls." });
				}
				else {
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
