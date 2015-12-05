import { Component, View, FORM_DIRECTIVES } from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

export class Poll {
	id: number;
	name: string;
}

@Component({
	selector: 'editor',
})
@View({
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
	// templateUrl: 'components/pollseditor'
	template:`
	<h1>{{title}}</h1>
	<h2>{{poll.name}} details!</h2>
	<div><label>id: </label>{{poll.id}}</div>
	<div>
		<label>name: </label>
		<div><input [(ng-model)]="pall.name" placeholder="name"></div>
	</div>
	`
})

export class PollEditor {
	public title = 'Tour of Heroes';
	public poll: Poll = {
	  id: 1,
	  name: 'Windstorm'
	};
}
