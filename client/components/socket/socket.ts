import { Component } from 'angular2/core';

@Component({
   selector: 'socket',
   template: `
        <button (click)="myOwnEvent()">Click me!</button>
        <input (click)="myOwnEvent()">
        <p>MESSAGE: {{clickMessage}}</p>
    `
})
export class Socket {
  clickMessage = '';

  myOwnEvent()
  {
      this.clickMessage ='You are my hero!';
  }
}
