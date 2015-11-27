import { Component, View, bootstrap, provide } from 'angular2/angular2';
import { RouteConfig, RouterLink, RouterOutlet, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, ROUTER_DIRECTIVES, Router, Location, Route } from 'angular2/router';
import { HomeComponent } from './components/home/home';
import { SignIn } from './components/signin/signin';

@Component({
	selector: 'app',
	template: '<router-outlet></router-outlet>',
	directives: [HomeComponent, SignIn, RouterLink, RouterOutlet]
})
@RouteConfig([
	{ path: '/', component: HomeComponent, name: 'Home' },
	{ path: '/signin', component: SignIn, name: 'SignIn' }
])

export class App { }
bootstrap(App, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
