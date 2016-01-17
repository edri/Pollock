import { bootstrap } from 'angular2/platform/browser'
import { Component, View, provide, Input } from 'angular2/core';
import { Router, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, RouteConfig, Route, ROUTER_DIRECTIVES, APP_BASE_HREF } from 'angular2/router';
import { HomeComponent } from './components/home/home';
import { Navbar } from './components/navbar/index';
import { SignIn } from './components/signin/signin';
import { SignUp } from './components/signup/signup';
import { Action } from './components/action/action';
import { Participate } from './components/participate/participate';
import { PollsList } from './components/pollslist/pollslist';
import { PollEditor } from './components/polleditor/index';
import { Stats } from './components/stats/stats';

@Component({
	selector: 'app'
	// providers: [SignIn]
	// directives: [SignIn]
})
@View({
	template: `
	<navbar [username]="username"></navbar>
	<div class="main">
    	<router-outlet></router-outlet>
	</div>`,
	// template: '<router-outlet></router-outlet>',
	directives: [Navbar, HomeComponent, SignIn, SignUp, ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/', component: HomeComponent, name: 'Home' },
	{ path: '/signin', component: SignIn, name: 'SignIn' },
	{ path: '/signup', component: SignUp, name: 'SignUp' },
	{ path: '/action', component: Action, name: 'Action' },
	{ path: '/pollslist', component: PollsList, name: 'PollsList' },
	{ path: '/editor/:id', component: PollEditor, name: 'PollEditor' },
	{ path: '/participate', component: Participate, name: 'Participate' },
	{ path: '/stats/:id', component: Stats, name: 'Stats' },
])
export class App {
	public username;

	constructor(private router: Router) {
		this.router = router;
	}

	ngOnInit() {
		// document.addEventListener('storage', function(event) {
		// 	var key = event.key;
		// 	var newValue = event.newValue;
		// 	var oldValue = event.oldValue;
		// 	var url = event.url;
		// 	var storageArea = event.storageArea;

		// 	console.log('STORAGE');
		// 	console.log(oldValue);
		// 	console.log(newValue);

		// 	// handle the event
		// });

		if (localStorage && localStorage.getItem('username')) {
			// logged
			this.username = localStorage.getItem('username');
			this.router.navigate(['Action']);
		}
		// this.username = 'test_from_app';
		console.log('[Component] app running');
	}

	ngOnChanges(a) {
		console.info(a)
        console.log('[Component] app onChanges');
    }
}

bootstrap(App, [
	ROUTER_PROVIDERS,
	provide(APP_BASE_HREF, { useValue: '/' }),
	provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
