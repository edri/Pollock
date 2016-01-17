import { Component, View, Input } from 'angular2/core';
import { RouterLink, Router } from 'angular2/router';

import { App } from './../../bootstrap';

@Component({
	selector: 'navbar',
	directives: [RouterLink],
	// providers: [App],
	// template: require('./index.html')
	// templateUrl: 'components/navbar'
	template: `
<nav class="navbar navbar-dark bg-primary">
	<a class="navbar-brand" href="#">Pollock</a>
		<ul class="nav navbar-nav">
			<li class="nav-item">
				<a class="nav-link" [routerLink]="['./Home']">Home</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" [routerLink]="['./PollEditor']">Editor</a>
			</li>

			<li class="nav-item pull-right" *ngIf="username">
				<form class="form-inline pull-xs-right">
					Logged as {{username}}
					<button class="btn btn-success-outline" type="submit" (click)="logout()">Logout</button>
				</form>
			</li>

			<li class="nav-item pull-right" *ngIf="!username">
				<button class="btn btn-success-outline" [routerLink]="['/SignIn']">Signin</button>
			</li>
		</ul>
</nav>`
		//- 	form.form-inline.navbar-form.pull-right
		//- 		| Logged in as _edri_ localStorage.username
		//- 		button.btn.btn-info-outline.btnLogout(type='submit') Logout
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
		this.router.navigate(['Home']);
	}
}
