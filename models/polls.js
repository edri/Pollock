var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create polls' schema.
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

// Get the polls' model.
module.exports = mongoose.model("polls", pollsSchema);
