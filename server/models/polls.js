var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create polls' schema.
var pollsSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	creationDate: {
		type: Date,
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
			},
			text: {
				type: String,
				required: true
			}
		}]
	}]
});

pollsSchema.path("questions").schema.path("choices").schema.path("key").validate(
	function(questions) {
		if(!questions) {
			return false;
		} else if(questions.length < 2) {
			return false;
		}
		return true;
}, "polls need to have at least two questions");

// Get the polls' model.
module.exports = mongoose.model("polls", pollsSchema);
