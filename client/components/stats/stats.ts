import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteParams } from 'angular2/router';

declare var io;
declare var BASE_URL;

declare var Chart: any; // Magic

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

	// Get router's ID parameter.
	constructor(params: RouteParams) {
		this.id = params.get('id');
		this.getData();

		// TODO: doesn't work yet.
		/*this.ctx = document.getElementById("chartParticipations");

		let data = [
			{
			    value: 25,
			    label: 'Java',
			    color: '#811BD6'
			},
			{
			    value: 10,
			    label: 'Scala',
			    color: '#9CBABA'
			}
		];

		let myPieChart = new Chart(this.ctx, {
			type: 'pie',
			data: data,
			options: {
				responsiveAnimationDuration: 200
			}
		});*/
	}
}
