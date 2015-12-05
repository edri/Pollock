import { Component, View } from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'Home'
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/home'
})
export class HomeComponent { }
