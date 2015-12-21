import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'Action',
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/action'
})
export class Action { }
