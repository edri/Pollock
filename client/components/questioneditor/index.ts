import { Component, View, Input } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Question } from './question';

@Component({
	selector: 'question-editor'
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

export class QuestionEditor {

	@Input() index;
	public question: Question;

	constructor() {
		this.question = new Question(123, 'Do we have free will ?', 'QCM', [
			{ key: 'Yes', text: 'Yes yes...' },
			{ key: 'Maybe', text: 'Maybe' },
			{ key: 'No', text: 'No no...' }
		]);
	}

	addAnswer(text: any) {
		if (text.value) {
			this.question.choices.push({ key: text.value.replace(/ +/, '_'), text: text.value })
			text.value = null
		}
		console.log(this.question.choices)
	}

	removeAnswer(id: number) {
		this.question.choices.splice(id, 1);
	}

}

// var poll = {
// 	title: "I'm a cool test!",
// 	state: 'Created',
// 	questions: [{
// 		title: 'do i work?',
// 		type: 'qcm',
// 		choices: [{
// 			key: 'Yes',
// 			text: 'Yes yes...'
// 		}, { key: 'No', text: 'No no...' }]
// 	}]
// }
// var socket = io('http://localhost:3000');
// socket.emit('createPoll', poll);
