import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

declare var io;

@Component({
	selector: 'Home'
})
@View({
	directives: [ROUTER_DIRECTIVES],
    templateUrl: 'components/home'
})
export class HomeComponent { }
