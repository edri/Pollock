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

usersSchema.pre('save', function (next) {
	var user = this;

	if (!user.isModified('password')) {
		return next();
	};

	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}
	
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) {
				return next(err);
			};

			user.password = hash;
			next();
		});
	});
});

module.exports = mongoose.model("user", usersSchema);
