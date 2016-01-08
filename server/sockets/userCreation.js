var io = require('../app').io;
var User = require('../models/users');

/*io.on('connection', socket => {
	console.info('New socket ! (app.js)')
	socket.emit('pong', { hello: 'world' })
})

/*io.on('connection', (socket) => {
	console.log("LOL");

	socket.on('newUser', (data) => {
		console.log(data)
	})

	socket.on("userCreated", function(json) {
		var newUser = new User(json);
		newUser.save((err) => {
			if (err) {
				console.log("error creating user: " + err);
			};
		});
	});
});
*/
