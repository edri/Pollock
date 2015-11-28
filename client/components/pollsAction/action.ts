import { Component, View, bootstrap } from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'Action',
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/action'
})
export class Action { }
