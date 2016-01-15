import { bootstrap }    from 'angular2/platform/browser'
import { Component, View, provide } from 'angular2/core';
import { RouteConfig, RouterLink, RouterOutlet, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, ROUTER_DIRECTIVES, Router, Location, Route } from 'angular2/router';
import { HomeComponent } from './components/home/home';
import { SignIn } from './components/signin/signin';
import { SignUp } from './components/signup/signup';
import { Action } from './components/action/action';
import { PollsList } from './components/pollslist/pollslist';
import { PollEditor } from './components/polleditor/polleditor';
import { Stats } from './components/stats/stats';

@Component({
	selector: 'app'
})
@View({
	template: '<router-outlet></router-outlet>',
	directives: [ROUTER_DIRECTIVES, HomeComponent, SignIn, SignUp, RouterLink, RouterOutlet]
})
@RouteConfig([
	{ path: '/', component: HomeComponent, name: 'Home' },
	{ path: '/signin', component: SignIn, name: 'SignIn' },
	{ path: '/signup', component: SignUp, name: 'SignUp' },
	{ path: '/action', component: Action, name: 'Action' },
	{ path: '/pollslist', component: PollsList, name: 'PollsList' },
	{ path: '/editor', component: PollEditor, name: 'PollEditor' },
	{ path: '/stats/:id', component: Stats, name: 'Stats' },
])
export class App { }

bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
