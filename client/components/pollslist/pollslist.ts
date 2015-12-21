import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'PollsList',
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/pollslist'
})
export class PollsList { }
