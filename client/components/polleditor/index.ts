import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { QuestionEditor } from './../questioneditor/index';

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

	<div>
		-- questions.length <question-editor poll="0" index="i"></question-editor>
	</div>
	`
})

export class PollEditor {
	public id;
	public title: string;
	public questions;

	ngOnInit() {
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
// let socket = io('http://localhost:3000');
// socket.emit('createPoll', poll);

		// getPolls
		// socket.emit('getPoll', 0);
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
