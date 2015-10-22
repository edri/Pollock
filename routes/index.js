var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost/test', (error) => {
	if(error) {
		console.log(error);
	} else {
		console.log("Connected to database");
	}
});

var Schema = mongoose.Schema;

var pollsSchema = new Schema({
	title: String,
	creationDate: Date,
	state: String,
	questions: [{
		title: String,
		type: String,
		choices: [{
			key: String,
			text: String,
			participations: [{
				participant: String,
				submissionDate: Date
			}]
		}]
	}],
});

var polls = mongoose.model("polls", pollsSchema);

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Pollock' });
});

module.exports = router;
