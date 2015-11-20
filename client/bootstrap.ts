import {Component,View, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'app',
})

@View({
    template: '<h1>Hello World 42</h1>'
})

class App { }
bootstrap(App);
