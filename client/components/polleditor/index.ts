import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteParams } from 'angular2/router';

import { QuestionEditor } from './../questioneditor/index';
import { Question } from './../questioneditor/question';

declare var io;

@Component({
	selector: 'editor'
})
@View({
	directives: [ROUTER_DIRECTIVES, QuestionEditor],
	template: `
	<div class="main-wrapper">
		<h1>
			<input class="form-control form-title form-big" [(ngModel)]="title" placeholder="Poll title">
		</h1>

		<!-- <div class="text-muted" *ngFor="#l of sharedQuest">{{l | json}}</div> -->

		<div *ngFor="#l of sharedQuest #i=index">
			<question-editor [questions]="sharedQuest" index="{{i}}"></question-editor>
		</div>

		<div class="center">
			<button class="btn btn-xl btn-info" type="button" (click)='addQuestion()'>Add a question</button>
			<button class="btn btn-xl btn-primary" type="button" (click)='save()'>Save the poll (and the Queen)</button>
		</div>
	</div>
	`
})

export class PollEditor {
	public id;
	public title: string;
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

	ngOnInit(params: RouteParams) {
		console.log("INIT");
		console.log(params)
		if (params) {
			this.id = params;
		}
		console.log(this.id);
		let socket = io('http://localhost:3000');
		socket.emit('getPoll', 0);
		socket.on('getPollOK', function(data) {
			console.info(data);
		});
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

	addQuestion() {
		this.sharedQuest.push(
			new Question(123, 'Question', 'QCM', [
				{ key: 'Yes', text: 'Yes' }
			])
		);
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
