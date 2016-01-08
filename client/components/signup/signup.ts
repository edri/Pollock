import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
// Even if your IDE marks this as wrong it is not ; this path is dynamically
// created by socket.io.
import io from '/socket.io/socket.io.js';

@Component({
	selector: 'Signup',
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/signup'
})
export class SignUp {
	signUp() {
		var socket = io.connect("http://localhost:3000/");

		var userData = {
			email: "migwelsh.28@gmail.com",
			userName: "edri",
			password: "valais"
		};

		socket.emit('userCreated', userData);

		/*socket.on('news', function (data) {
			console.log(data);
			socket.emit('my other event', { my: 'data' });
		});*/
	}
}
