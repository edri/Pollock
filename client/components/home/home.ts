import {Component, View, bootstrap} from 'angular2/angular2';


@Component({
    selector: 'btn',
    template: `<button (click)="onClickMe()" class="btn btn-primary page-scroll btn-lg" href="#main">{{ text }}</button>`
})
class ButtonComponent {
    text = 'test';

    onClickMe(){
        alert('You are my hero!');
    }
}

@Component({
    selector: 'home'
})
@View({
    directives: [ButtonComponent],
    // template: '<h1>home comp</h1>'
    templateUrl: 'javascripts/components/home/home.html'
})
export class HomeComponent { }
