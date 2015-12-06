import { Component, View, FORM_DIRECTIVES, NgFor, CORE_DIRECTIVES } from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

export class Poll {
	answers: string[];
	title: string;
}

@Component({
	selector: 'editor'
})
@View({
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES, NgFor],
	templateUrl: 'components/editor'
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

	addAnswer(text: any) {
		if (text.value) {
			this.poll.answers.push(text.value)
			text.value = null
		}
		console.log(this.poll.answers)
	}
}
