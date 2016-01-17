import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteParams } from 'angular2/router';

declare var io;

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

	getData() {
		var socket = io.connect("http://localhost:3000/");

		socket.emit('statsAsking', this.id);

		socket.on("statsData", (result) => {
			if (result.success) {
				this.poll = result.poll;
			}
			else {
				this.error = result.error;
			}
		});
	}

	// Get router's ID parameter.
	constructor(params: RouteParams) {
		this.id = params.get('id');
		this.getData();
	}
}
