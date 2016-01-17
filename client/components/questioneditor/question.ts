export class Question {
	constructor(
		public id: number, // index
		public title: string,
		public type: string,
		public choices: any
	) { }
}
