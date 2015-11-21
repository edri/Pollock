import {Component, View, bootstrap} from 'angular2/angular2';


@Component({
    selector: 'btn',
})
class Button { }

@Component({
    selector: 'home',
})
@View({
    templateUrl: 'home.html'
})
export class HomeComponent { }
