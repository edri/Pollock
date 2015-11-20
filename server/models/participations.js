var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating participations' schema.
var participationsSchema = new Schema({
	participant: {
		type: String,
		required: true
	},
	submissionDate: {
		type: Date,
		required: true
	},
	poll: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "polls",
		required: true
	},
	answers: [{
		choice: {
			type: String,
			required: true
		}
	}]
});

module.exports = mongoose.model("participations", participationsSchema);