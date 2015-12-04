var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	email : {
		type: String,
		required: true,
		unique: true
	},
	userName: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("user", usersSchema);

usersSchema.pre('save', (next) => {
	var user = this;

	if (!user.isModified('password')) {
		return next;
	};

	bcrypt.hash(user.password, null, null, (err, hash) => {
		if (err) {
			return next(err);
		};

		user.password = hash;
		next();
	});
});