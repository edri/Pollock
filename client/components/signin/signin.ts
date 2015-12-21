import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'Signin',
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/signin'
})
export class SignIn { }
