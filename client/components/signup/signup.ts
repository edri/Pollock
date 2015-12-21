import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'Signup',
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/signup'
})
export class SignUp { }
