import { Component, View } from 'angular2/core';
import { FORM_DIRECTIVES, NgForm } from 'angular2/common';
// import { FormBuilder, Validators } from 'angular2/forms';
import { ROUTER_DIRECTIVES, RouteParams, Router } from 'angular2/router';

declare var io;
declare var BASE_URL;

declare var Chart: any; // Magic

@Component({
	selector: 'Participate',
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/participate'
})
export class Participate {
	id: string;
	ctx: any;
	error = null;
	poll = null;
	participations = [];
	myParticipation = {
		participant: localStorage.getItem('username'),
		answers: [],
		poll: "",
		submissionDate: new Date()
	};


	// Get router's ID parameter.
	constructor(params: RouteParams, private router: Router) {
		this.id = params.get('id');
		this.getData();
		this.myParticipation.poll = this.id;	
		this.router = router;
	}

	getData() {
		var socket = io.connect(BASE_URL);

		socket.emit('statsAsking', this.id);

		socket.on("statsData", (result) => {
			if (result.success) {
				this.poll = result.poll;
				this.participations = result.participations;
			}
			else {
				this.error = result.error;
			}
		});
	}


	send() {
		this.myParticipation.submissionDate = new Date();

		var questions = document.querySelectorAll('.question');
		var answers = [];

		[].forEach.call(questions, function(q) {
			var choices = document.querySelectorAll('.choice');

			[].forEach.call(choices, function(c) {
				if (c.checked) {
					answers.push({ choice: c.value });
				}
			});
		});

		this.myParticipation.answers = answers;

		var socket = io.connect(BASE_URL);

		socket.emit('participate', this.myParticipation);

		this.router.navigate(['Stats', { id: this.id }]);
	}
}
