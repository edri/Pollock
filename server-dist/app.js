/// <reference path="typings/tsd.d.ts" />
// 'use strict';
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// import * as routes from './routes/index';
// import * as apiRoutes from './routes/api';
// import * as users from './routes/users';
// var routes = require('./routes/index');
// var apiRoutes = require('./routes/api');
// var users = require('./routes/users');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
var Routes = (function () {
    function Routes() {
    }
    Routes.init = function (app, router) {
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }
        // production error handler
        // no stacktraces leaked to user
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    };
    return Routes;
})();
// Start the server on port 3000.
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Pollock server listening at http://%s:%s.', host, port);
});
module.exports = app;
//# sourceMappingURL=app.js.map