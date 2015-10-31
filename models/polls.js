var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create polls' schema.
var pollsSchema = new Schema({
	title: {
		type: String, 
		required: true
	}
	creationDate: {
		type Date, 
		required: true
	},
	state: {
		type: String,
		required: true
	},
	questions: [{
		title: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		choices: [{
			key: {
				type: String,
				required: true
			}
			text: {
				type: String,
				required: true
			}
		}]
	}],
	participations: [{
		id: Schema.ObjectId,
		ref: participations,
		required: true
	}]
});

pollsSchema.path("questions").schema.path("choices").schema.path("key").validate(
	function(questions) {
		if(!features) {
			return false;
		} else if(features.length < 2) {
			return false;
		}
		return true;
}, "polls need to have at least two questions");

var participationsSchema = new Schema({
	participant: {
		type: String,
		required: true
	},
	submissionDate: {
		type: date,
		required: true
	},
	poll: {
		type: Schema.ObjectId,
		ref: polls,
		required: true
	answers: [{
		choice: {
			type: String,
			required: true
		}
	}]
});

// Get the polls' model.
module.exports = mongoose.model("polls", pollsSchema);
module.exports = mongoose.model("participations", participationsSchema);
