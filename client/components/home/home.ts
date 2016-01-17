import { Component, View } from 'angular2/core';
import { Router, ROUTER_DIRECTIVES } from 'angular2/router';

declare var io;

@Component({
	selector: 'Home'
})
@View({
	directives: [ROUTER_DIRECTIVES],
    templateUrl: 'components/home'
})
export class HomeComponent {

	constructor(private router: Router) {
		this.router = router;
	}

	ngOnInit() {
		if(localStorage && localStorage.getItem('username')) {
			this.router.navigate(['Action']);
		}
	}
}
