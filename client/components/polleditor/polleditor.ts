import { Component, View, FORM_DIRECTIVES, NgFor } from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

export class Poll {
	answers: string[];
	title: string;
}

@Component({
	selector: 'editor',
})
@View({
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, NgFor],
	// templateUrl: 'components/pollseditor'
	template:`
	<h1><input [(ng-model)]="poll.title" placeholder="title"></h1>
	<ul>
    <li *ng-for="#answer of poll.answers">
        <span class="badge">{{answer}}</span>
    </li>
	</ul>
	`
})

export class PollEditor {
	public poll: Poll = {
		title: 'Do we have free will ?',
		answers: [
			'Yes',
			'Maybe',
			'Nop !'
		]
	};
}
