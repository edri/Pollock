import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { QuestionEditor } from './../questioneditor/index';
import { Question } from './../questioneditor/question';

declare var io;

@Component({
	selector: 'editor'
})
@View({
	directives: [ROUTER_DIRECTIVES, QuestionEditor],
	template: `

	<input class="form-control" [(ngModel)]="title" placeholder="Poll title">

	<div *ngFor="#questions #i=index">
		{{i}} <question-editor poll="0" index="i"></question-editor>
	</div>


	<button class="btn btn-info" type="button" (click)='save()'>SAVEALL</button>

<div *ngFor="#l of sharedQuest">{{l | json}}</div>

	<div>
		// -- {{title}} questions.length
		<question-editor [questions]="sharedQuest" index="0" (event)="doSomething()" pollIndex="{{id}}" pollTitle="{{title}}"></question-editor>
	</div>
	`
})

export class PollEditor {
	public id;
	public title: string;
	public questions;
	public sharedQuest;

	constructor() {
		this.id = 0;
		this.title = 'Your poll title';

		this.sharedQuest = [
			new Question(123, 'Do we have free will ?', 'QCM', [
				{ key: 'Yes', text: 'Yes yes...' },
				{ key: 'Maybe', text: 'Maybe' },
				{ key: 'No', text: 'No no...' }
			])
		];
	}

	save() {
		console.log("POLL EDITOR")
		// console.log(QuestionEditor)
		console.log(this.sharedQuest)
		// console.log(this.questions)

		let poll = {
			title: this.title,
			state: 'Created',
			questions: this.sharedQuest
		}

		console.log(poll)

		let socket = io('http://localhost:3000');
		socket.emit('createPoll', poll);
	}

	doSomething(q) {
		console.log("efuifigufuhi")
		console.log(q)
	}

	ngOnInit() {
	}

}

// let poll = {
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
