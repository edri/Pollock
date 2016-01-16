import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

declare var io;

@Component({
	selector: 'Signin',
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/signin'
})
export class SignIn {
	error = null;

	signIn = (username:string, password:string) => {
		// Checks that fields aren't empty.
		if (username && password) {
			let socket = io('http://localhost:3000/');

			this.error = null;

			let userData = {
				userName: username,
				password: password
			};

			socket.emit('login', userData);

			socket.on('auth', (state) => {
				if (state.success) {
					window.location.href = '#/action';
				}
				else {
					this.error = 'Login failed, please retry.';
				}
			});
		}
		else {
			this.error = 'Please fill all fields.';
		}
	}
}
