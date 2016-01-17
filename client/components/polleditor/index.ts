import { Component, View } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';

export class Poll {
	answers: string[];
	title: string;
}

@Component({
	selector: 'editor'
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/editor'
	// template: `
// <input type="text" class="form-control" required
          // [(ngModel)]="poll.title"
             // >
	// `
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
