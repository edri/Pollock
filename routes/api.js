var express = require('express');
var router = express.Router();
var Polls = require('../models/polls');
var Participations = require('../models/participations');

// Polls
router.route('/polls')
	/**
	 * @api GET /polls
	 * @apiName GetPolls
	 * @apiGroup polls
	 *
	 *  @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     [{
     *       "_id": "51bb793aca2ab77a3200000d",
     *       "title": "TestTest",
     *       "creationDate": "2015-11-01T13:01:11.204Z",
     *       "state": "Close",
     *       "__v": 1,
     *       "questions": [
     *         {
     *           "title": "Q21",
     *           "type": "easy",
     *           "_id": "56364f9a39ac36fd72c74e5f",
     *           "choices": [
     *             {
     *               "key": "R1",
     *               "text": "Rep1",
     *               "_id": "56364f9a39ac36fd72c74e60"
     *             }
     *           ]
     *         }
     *       ]
     *     },
     *     {
     *       "_id": "51c35e5ced18cb901d000001",
     *       "title": "Test2",
     *       "creationDate": "2015-04-29T12:54:59.000Z",
     *       "state": "Close",
     *       "__v": 0,
     *       "questions": [
     *         {
     *           "title": "Q1",
     *           "type": "Easy",
     *           "_id": "56360d178b275b6b2519d17a",
     *           "choices": [
     *             {
     *               "key": "R1",
     *               "text": "La réponse 1.",
     *               "_id": "56360d178b275b6b2519d17c"
     *             },
     *             {
     *               "key": "R2",
     *               "text": "La réponse 2.",
     *               "_id": "56360d178b275b6b2519d17b"
     *             }
     *           ]
     *         }
     *       ]
     *     }]
	 * 
	 */
	.get(function (req, res) {
		Polls.find(function (err, polls) {
			if (err) {
				res.send(err);
				return;
			}

			res.json(polls);
		});
	})
	.post(function (req, res) {
		var poll = new Polls();

		if (req.body._id) {
			poll._id = req.body._id;
		}

		poll.title = req.body.title;
		poll.creationDate = new Date();
		poll.state = req.body.state;
		poll.questions = JSON.parse(req.body.questions);

		poll.save(function(err) {
			if (err) {
				res.send(err);
				return;
			}

			res.status(201).send();
		});
	});

router.route('/polls/:pollId')
	/**
	 * @api {GET} /polls/:pollId
	 * @apiName GetPoll
	 * @apiGroup poll
	 * 
	 * @apiParam {Number} pollId Polls unique ID.
	 *
	 *  @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "title": "MyPoll",
	 *       "creationDate": "2015-11-01T13:01:11.204Z",
	 *       "state": "Open",
	 *       "questions": [
     *         {
     *           "title": "Q21",
     *           "type": "easy",
     *           "_id": "56364f9a39ac36fd72c74e5f",
     *           "choices": [
     *             {
     *               "key": "R1",
     *               "text": "Rep1",
     *               "_id": "56364f9a39ac36fd72c74e60"
     *             }
     *           ]
     *         }
     *       ]
	 *     }
	 *
	 * @apiError UserNotFound The id of the Poll was not found.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     "Poll not found"
	 * 
	 */
	.get(function (req, res) {
		Polls.findById(req.params.pollId, function (err, polls) {
			if (err) {
				res.send(err);
				return;
			}

			if (!polls) {
				res.status(404).send('Poll not found');
			} else {
				res.json(polls);
			}
		});
	})
	.put(function (req, res) {
		Polls.findById(req.params.pollId, function(err, poll) {
			if (err) {
				res.send(err);
				return;
			}

			poll.title = req.body.title;
			poll.state = req.body.state;
			poll.questions = JSON.parse(req.body.questions);

			poll.save(function (err) {
				if (err) {
					res.send(err);
					return;
				}

				res.json({ message: 'Poll updated' });
			});
		});
	})
	.delete(function (req, res) {
		Polls.remove({ _id: req.params.pollId }, function(err, poll) {
			if (err) {
				res.send(err);
				return;
			}

			res.json({ message: 'Poll deleted' });
		});
	});

// Participations
router.route('/participations')
	.get(function (req, res) {
		Participations.find(function (err, participations) {
			if (err) {
				res.send(err);
				return;
			}

			res.json(participations);
		});
	})
	.post(function (req, res) {
		var participation = new Participations();
		participation.participant = req.body.participant;
		participation.submissionDate = new Date();
		participation.poll = req.body.poll;
		participation.answers = JSON.parse(req.body.answers);

		if (req.body._id) {
			participation._id = req.body._id;
		}

		participation.save(function(err) {
			if (err) {
				res.send(err);
				return;
			}

			res.status(201).send();
		});
	});

router.route('/participations/:pollId')
	.get(function (req, res) {
		Participations.find({ poll: req.params.pollId }, function (err, participations) {
			if (err) {
				res.send(err);
				return;
			}

			res.json(participations);
		});
	});

router.route('/participations/:participationId')
	.put(function (req, res) {
		Participations.findById(req.params.participationId, function(err, participation) {
			if (err) {
				res.send(err);
				return;
			}

			console.log(participation);
			console.log(req.body);

			participation.participant = req.body.participant;
			participation.answers = JSON.parse(req.body.answers);

			participation.save(function (err) {
				if (err) {
					res.send(err);
					return;
				}

				res.json({ message: 'Participation updated' });
			});
		})
	})
	.delete(function (req, res) {
		Participations.remove({ _id: req.params.participationId }, function(err, participation) {
			if (err) {
				res.send(err);
				return;
			}

			res.json({ message: 'Participation deleted' });
		});
	});

module.exports = router;
