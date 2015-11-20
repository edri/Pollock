//import deps
import 'zone.js';
import 'reflect-metadata';
//you may need es6-shim if you get an error relating to list.fill
// import 'es6-shim';

//if using traceur compiler:
import {
  ComponentAnnotation as Component,
  ViewAnnotation as View,
  bootstrap
} from 'angular2/angular2';
//OR
//if using babel or typescript compiler:
import {
  Component,
  View,
  bootstrap
} from 'angular2/angular2';

//create a simple angular component
@Component({
  selector: 'test-app'
})
@View({
  template: '<h4>Hello {{name}}</h4>'
})
class TestApp {
  name: string;
  constructor(){
      console.log("OKOKOK");
    this.name = 'Angular2';
    setTimeout(() => {
      this.name = 'Angular2!!!'
    }, 500);
  }
}

//start our app
bootstrap(TestApp);
