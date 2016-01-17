import { Component, View, EventEmitter, Output } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

declare var io;

@Component({
	selector: 'Signin',
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/signin'
})
// Login
export class SignIn {

	private error;
	// @Output() login = new EventEmitter();

	constructor(private router: Router) {
		this.router = router;
	}


	ngOnInit() {
    }

    // constructor(a) {
    	// console.log(a)
    // }

	/**
	 * Sign In
	 * @param {string} username
	 * @param {string} password
	 */
	signIn(username: string, password: string) {
		// Checks that fields aren't empty.
		if (username && password) {
			let socket = io('http://localhost:3000/');

			this.error = null;

			let userData = {
				userName: username,
				password: password
			};

			socket.emit('login', userData);

			socket.on('auth', state => {
				if (state.success) {
					// this.username = state.username;
					// Warning! If you change something here, report it in the signup component.
					localStorage.setItem('username', state.username);
					// this.login.emit(state.username);
					// App.username = 'new username'

					var url = window.location;
					var baseUrl = url.protocol + "//" + url.host + "/" + url.pathname.split('/')[1];
					document.location = baseUrl;
					//this.router.navigate(['Action']);
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
