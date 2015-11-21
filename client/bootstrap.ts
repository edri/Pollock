import {Component, View, bootstrap} from 'angular2/angular2';
import {HomeComponent} from './components/home/home';

@Component({
    selector: 'app',
    template: '<h1>Hello Pollock<home></home></h1>',
    directives: [HomeComponent]
})

class App { }
bootstrap(App);
