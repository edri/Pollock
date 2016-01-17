import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

declare var io;
declare var BASE_URL;

@Component({
	selector: 'Signup',
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/signup'
})
export class SignUp {
	constructor(private router: Router) {
		this.router = router;
	}

	error = null;
	success = null;

	// Triggered when the user pressed the "Submit" button.
	signUp(email: string, username: string, password1: string, password2: string) {
		this.success = false;

		var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		// Checks that fields aren't empty.
		if (email && username && password1 && password2) {
			// The entered email address must be a valid one.
			if (emailRegex.test(email)) {
				// Checks that passwords are similar.
				if (password1 === password2) {
					var socket = io(BASE_URL);

					this.error = null;

					let userData = {
						email: email,
						userName: username,
						password: password1
					};

					socket.emit('userCreated', userData);

					socket.on('creationState', (state) => {
						if (state.success) {
							// this.success = 'Yay you successfully signed up!';

							// Warning! If you change something here, report it in the signin component.
							localStorage.setItem('username', username);

							document.location.href = BASE_URL;

							// this.router.navigate(['Action']);
						}
						else {
							this.error = 'The email or the username you choosed is already taken.';
						}
				    });
				}
				else {
					this.error = 'The passwords you entered don\'t match.';
				}
			}
			else {
				this.error = 'Please enter a valid email address.'
			}
		}
		else {
			this.error = 'Please fill all fields.';
		}
	}
}
