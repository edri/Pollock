// import {Component,View, bootstrap} from 'angular2/angular2';
// import {ROUTER_PROVIDERS} from 'angular2/router';

// var express = require('express');
// var app = express();
//
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
//
// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;
//
//   console.log('Example app listening at http://%s:%s', host, port);
// });

/// <reference path="../typings/tsd.d.ts" />

'use strict';

// if ('production' === process.env.NODE_ENV)
    // require('newrelic');

var PORT = process.env.PORT || 3333;

import * as express from 'express';
import * as os from 'os';

var app = express();
var server = app.listen(PORT);

console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
console.log(`enviroment: ${process.env.NODE_ENV}`);


// @Component({
//     selector: 'app',
// })
//
// @View({
//     template: '<h1>Hello World lol</h1>'
// })
//
// class App { }
// bootstrap(App);


// import {bootstrap} from 'angular2/angular2';
// import {ROUTER_PROVIDERS} from 'angular2/router';
// import {AppCmp} from './components/app/app';
//
// bootstrap(AppCmp, [
//   ROUTER_PROVIDERS
// ]);
