import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteParams } from 'angular2/router';
// Even if your IDE marks this as wrong it is not ; this path is dynamically
// created by socket.io.
import io from '/socket.io/socket.io.js';
declare var Chart:any; // Magic

@Component({
	selector: 'Stats',
})
@View({
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'components/stats'
})
export class Stats {
	id:string;
	ctx: any;
	error = null;
	poll = null;
	participations = [];

	getData = () => {
		var socket = io.connect("http://localhost:3000/");

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

	// Get router's ID parameter.
	constructor(params: RouteParams) {
		this.id = params.get('id');
		this.ctx = document.getElementById("chartParticipations");
		this.getData();
	}
}
