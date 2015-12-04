var io = require('../app');
var User = require('../models/users');

io.on('connection', (socket) => {
	socket.on("userCreated", function(json) {
		var newUser = new User(json);
		newUser.save((err) => {
			if (err) {
				console.log("error creating user: " + err);
			};
		});
	});
});