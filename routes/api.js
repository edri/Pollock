var express = require('express');
var router = express.Router();
var Polls = require('../models/polls');
var Participations = require('../models/participations');

// Polls
router.route('/polls')
	.get(function (req, res) {
		Polls.find(function (err, polls) {
			if (err) {
				res.send(err);
			}

			res.json(polls);
		});
	})
	.post(function (req, res) {
		console.log(req.body);
		var poll = new Polls();
		poll.title = req.body.title;
		poll.creationDate = new Date();
		poll.state = req.body.state;
		poll.questions = [];

		poll.save(function(err) {
			if (err) {
				res.send(err);
			}

			res.status(201).send();
		});
	})

router.route('/polls/:pollId')
	.get(function (req, res) {
		Polls.findById(req.params.pollId, function (err, polls) {
			if (err) {
				res.send(err);
			}

			if (!polls) {
				res.status(404).send('Poll not found');
			} else {
				res.json(polls);
			}
		});
	})
	.put(function (req, res) { // TODO
		Polls.findById(req.params.pollId, function(err, poll) {
			if (err) {
				res.send(err);
			}

			// update from req.body to poll

			poll.save(function (err) {
				if (err) {
					res.send(err);
				}

				res.json({ message: 'Poll updated' });
			});
		});
	})
	.delete(function (req, res) {
		Polls.remove({ _id: req.params.pollId }, function(err, poll) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Poll deleted' });
		});
	})

// Participations
router.route('/participations')
	.get(function (req, res) {
		Participations.find(function (err, participations) {
			if (err) {
				res.send(err);
			}

			res.json(participations);
		});
	})
	.post(function (req, res) {
		var participation = new Participations();
		participation.participant = req.body.participant;
		participation.submissionDate = new Date();
		participation.poll = req.body.poll;
		participation.answers = [];

		participation.save(function(err) {
			if (err) {
				res.send(err);
			}

			res.status(201).send();
		});
	})

router.route('/participations/:pollId')
	.get(function (req, res) {
		Participations.find({ poll: req.params.pollId }, function (err, participations) {
			if (err) {
				res.send(err);
			}

			res.json(participations);
		});
	})

router.route('/participations/:participationId')
	.delete(function (req, res) {
		Participations.remove({ _id: req.params.participationId }, function(err, participation) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Participation deleted' });
		});
	})

module.exports = router;
