var express = require('express');
var router = express.Router();
var Polls = require('../models/polls');


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
		var poll = new Polls();
		poll.title = req.body.title;
		poll.creationDate = new Date();
		poll.state = req.body.state;
		poll.questions = [];

		poll.save(function(err) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Poll created!' });
		});
	})

router.route('/polls/:pollId')
	.get(function (req, res) {
		Polls.findById(req.params.pollId, function (err, polls) {
			if (err) {
				res.send(err);
			}

			res.json(polls);
		});
	})

	.put(function (req, res) {
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

module.exports = router;
