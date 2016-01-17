import { Component, View, Input } from 'angular2/core';
import { RouterLink, Router } from 'angular2/router';

import { App } from './../../bootstrap';

declare var BASE_URL;

@Component({
	selector: 'navbar',
	directives: [RouterLink],
	// providers: [App],
	// templateUrl: 'components/navbar'
	template: `
<nav class="navbar navbar-dark bg-primary">
	<a class="navbar-brand" href="#">Pollock</a>
		<ul class="nav navbar-nav">
			<li class="nav-item">
				<a class="nav-link" [routerLink]="['Home']">Home</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" [routerLink]="['PollEditor', {id: 0}]">Editor</a>
			</li>

			<li class="nav-item pull-right pull-xs-right" *ngIf="username">
				<form class="form-inline">
					Logged as {{username}}
					<button class="btn btn-success-outline" type="submit" (click)="logout()">Logout</button>
				</form>
			</li>

			<li class="nav-item pull-right pull-xs-right" *ngIf="!username">
				<button class="btn btn-success-outline" [routerLink]="['/SignIn']">Signin</button>
			</li>
		</ul>
</nav>`
})
export class Navbar {
	@Input() username;

	constructor(private router: Router) {
		this.router = router;
		// console.log(app)
	}

	ngOnInit() {
		console.log(this.username)
		console.log('[Component] navbar running');
	}

	ngOnChanges() {
		console.log('[Component] navbar onChanges');
	}

	logout() {
		localStorage.removeItem('username');

		document.location.href = BASE_URL;

		// this.router.navigate(['Home']);
	}
}
