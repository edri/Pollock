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
	error = null;
	success = null;

	// Triggered when the user pressed the "Submit" button.
	signUp = (email:string, username:string, password1:string, password2:string) => {
		var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		// Checks that fields aren't empty.
		if (email && username && password1 && password2) {
			// The entered email address must be a valid one.
			if (emailRegex.test(email))
			{
				// Checks that passwords are similar.
				if (password1 == password2) {
					var socket = io.connect("http://localhost:3000/");

					this.error = null;

					var userData = {
						email: email,
						userName: username,
						password: password1
					};

					socket.emit('userCreated', userData);

					socket.on("creationState", function(state) {
						if (state.success) {
							console.log("User seccessfully signin' up!");
							this.success = "Yay you successfully signin' up!";
						}
						else {
							console.log("An error occured when creating the account.");
							this.error = "The email or the username you choosed is already taken.";
						}
				    });
				}
				else {
					this.error = "The passwords you entered don't match.";
				}
			}
			else {
				this.error = "Please enter a valid email address."
			}
		}
		else {
			this.error = "Please fill all fields.";
		}
	}
}
