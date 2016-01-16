'use strict'

let express = require('express')
let path = require('path')
let favicon = require('serve-favicon')
let logger = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')

let routes = require('./routes/index')
let apiRoutes = require('./routes/api')
let users = require('./routes/users')
let components = require('./routes/components')

var User = require('../server/models/users')
var Polls = require('../server/models/polls')
var Participations = require('../server/models/participations')

let app = express()

let socketio = require('socket.io')
var bcrypt = require('bcrypt')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('less-middleware')(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../public')))

app.use('/users', users)
app.use('/api', apiRoutes)
app.use('/', routes)
app.use('/components', components)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

// Start the server on port 3000.
let server = app.listen(3000, () => {
  let host = server.address().address
  let port = server.address().port

  console.log('Pollock server listening at http://%s:%s.', host, port)
})

// Socket.io
let io = socketio(server)

io.on('connection', (socket) => {
  //var socketid = socket.io.engine.id;
  var creationState;

  socket.on("userCreated", function(user) {
		var newUser = new User(user);
		newUser.save((err) => {
			if (err) {
				console.log("error creating user: " + err);
                creationState = false;
			}
            else {
                console.log("Successfully created new user.");
                creationState = true;
            }

            //io.to(socketid).emit("creationState", {success: creationState});
            socket.emit("creationState", {success: creationState});
		});
	});

  socket.on("login", function(user) {
    User.find({userName: user.userName + ""}, function(err, res) {
      var result;
      if (!err) {
        result = res[0];
      } else {
        console.log(err);
      }

      if (result) {
          bcrypt.compare(user.password, result.password, function(err, res) {
            if (err) {
              console.log(err)
            }
            socket.emit("auth", {success: res});
          });
      }
      else {
          socket.emit("auth", {success: false});
      }
    });
  });

    socket.on("statsAsking", function(pollId) {
        Polls.find({'_id': pollId}).exec(function(err, polls) {
    		if (err) {
    			console.log("ERROR: " + err);
                socket.emit("statsData", {
                    success: false,
                    error: "Can't get polls list, please retry in a while."
                });
    		}
    		else {
    			Participations.find({'poll': pollId}).exec(function(err, participations) {
    				if (err) {
    					console.log("ERROR: " + err);
                        socket.emit("statsData", {
                            success: false,
                            error: "Can't get participations list, please retry in a while."
                        });
    				}
    				else {
                        socket.emit("statsData", {
                            success: true,
                            poll: polls[0],
                            participations: participations
                        });
    				}
    			});
    		}
    	});
    });
});

module.exports = app
