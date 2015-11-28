import { Component, View, bootstrap } from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'Signup',
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/signup'
})
export class SignUp { }
