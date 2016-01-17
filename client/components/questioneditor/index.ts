import { Component, View, Input } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Question } from './question';

declare var io;
declare var BASE_URL;

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
	@Input() questions;
	@Input() pollTitle;
	public question: Question;

	constructor() {
	}

	ngOnInit() {
		this.question = this.questions[this.index];
		console.log(this.pollTitle)
	}

	public addAnswer(text: any) {
		if (text.value) {
			this.question.choices.push({ key: text.value.replace(/ +/, '_'), text: text.value })
			text.value = null
		}
		console.log(this.question.choices)

		this.questions[this.index] = this.question;


		// this.pollTitle = 'qwe';
		// this.event.emit(this.question);
	}

	removeAnswer(id: number) {
		this.question.choices.splice(id, 1);
		this.questions[this.index] = this.question;
	}

}
