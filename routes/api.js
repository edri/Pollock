var express = require('express');
var router = express.Router();
var Polls = require('../models/polls');
var Participations = require('../models/participations');

// Polls
router.route('/polls')
	/**
	 * @api {GET} /polls
	 * @apiName GetPolls
	 * @apiGroup polls
	 *
	 * @apiSuccessExample Success-Response:
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
	/**
	 * @api {POST} /polls
	 * @apiName PostPolls
	 * @apiGroup polls
	 *
	 * @apiParam {String} title Title of the Poll
	 * @apiParam {String} state State of the Poll
	 * @apiParam {Array} questions Questions of the Poll
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 201 Created
	 * 
	 */
	.post(function (req, res) {
		var poll = new Polls();

		if (req.body._id) {
			poll._id = req.body._id;
		}

		poll.title = req.body.title;
		poll.creationDate = new Date();
		poll.state = req.body.state;
		poll.questions = req.body.questions;

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
	 * @apiGroup polls
	 * 
	 * @apiParam {Number} pollId Polls unique ID
	 *
	 * @apiSuccessExample Success-Response:
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
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 404 Not Found
	 * 
	 */
	.get(function (req, res) {
		Polls.findById(req.params.pollId, function (err, polls) {
			if (err) {
				res.status(404).send(err);
				return;
			}

			res.json(polls);
		});
	})
	/**
	 * @api {PUT} /polls/:pollId
	 * @apiName PutPolls
	 * @apiGroup polls
	 *
	 * @apiParam {Number} pollId Polls unique ID.
	 * @apiParam {String} title Title of the Poll
	 * @apiParam {String} state State of the Poll
	 * @apiParam {Array} questions Questions of the Poll
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     "Poll updated"
	 * 
	 * 
	 * @apiErrorExample Error-Response:
 	 *     HTTP/1.1 404 Not Found
	 */
	.put(function (req, res) {
		Polls.findById(req.params.pollId, function(err, poll) {
			if (err) {
				res.status(404).send(err);
				return;
			}

			poll.title = req.body.title;
			poll.state = req.body.state;
			poll.questions = req.body.questions;

			poll.save(function (err) {
				if (err) {
					res.send(err);
					return;
				}

				res.json({ message: 'Poll updated' });
			});
		});
	})
	/**
	 * @api {DELETE} /polls/:pollId
	 * @apiName DeletePolls
	 * @apiGroup polls
	 *
	 * @apiParam {Number} pollId Polls unique ID.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     "Poll deleted"
	 * 
	 */
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
	/**
	 * @api {GET} /participations
	 * @apiName GetParticipations
	 * @apiGroup participations
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     [
     *       {
     *         "_id": "56360d178b275b6b2519d180",
     *         "participant": "Paul",
     *         "submissionDate": "2015-11-01T13:01:11.266Z",
     *         "poll": "51ab5e5ced18cb901d000001",
     *         "__v": 1,
     *         "answers": [
     *           {
     *             "choice": "R1",
     *             "_id": "56360d178b275b6b2519d182"
     *           }
     *         ]
     *       },
     *       {
     *         "_id": "563623da29193f7036169dde",
     *         "poll": "51ab5e5ced18cb901a000001",
     *         "submissionDate": "2015-11-01T14:38:18.420Z",
     *         "participant": "Mathieu",
     *         "__v": 0,
     *         "answers": []
     *       }
     *     ]
	 * 
	 */
	.get(function (req, res) {
		Participations.find(function (err, participations) {
			if (err) {
				res.send(err);
				return;
			}

			res.json(participations);
		});
	})
	/**
	 * @api {PUT} /participations
	 * @apiName PostParticipations
	 * @apiGroup participations
	 *
	 * @apiParam {String} participant Participant of the Prticipation
	 * @apiParam {String} poll ID of the poll
	 * @apiParam {Array} answers Answers of the Prticipation
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 201 Created
	 */
	.post(function (req, res) {
		var participation = new Participations();
		participation.participant = req.body.participant;
		participation.submissionDate = new Date();
		participation.poll = req.body.poll;
		participation.answers = req.body.answers;

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
	/**
	 * @api {GET} /participations
	 * @apiName GetParticipations
	 * @apiGroup participations
	 * 
	 * @apiParam {Number} pollId Polls unique ID.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
     *     [
     *       {
     *         "_id": "56360d178b275b6b2519d180",
     *         "participant": "Paul",
     *         "submissionDate": "2015-11-01T13:01:11.266Z",
     *         "poll": "51ab5e5ced18cb901d000001",
     *         "__v": 1,
     *         "answers": [
     *           {
     *             "choice": "R1",
     *             "_id": "56360d178b275b6b2519d182"
     *           }
     *         ]
     *       }
     *     ]
	 * 
	 * @apiErrorExample Error-Response:
 	 *     HTTP/1.1 404 Not Found
	 * 
	 */
	.get(function (req, res) {
		Participations.find({ poll: req.params.pollId }, function (err, participations) {
			if (err) {
				res.status(404).send(err);
				return;
			}

			res.json(participations);
		});
	});

router.route('/participations/:participationId')
	/**
	 * @api {PUT} /participations/:participationId
	 * @apiName PutParticipations
	 * @apiGroup participations
	 *
	 * @apiParam {Number} participationId Prticipations unique ID
	 * @apiParam {String} participant Participant of the Prticipation
	 * @apiParam {Array} answers Answers of the Prticipation
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     "Participation updated"
	 * 
	 * @apiErrorExample Error-Response:
 	 *     HTTP/1.1 404 Not Found
	 */
	.put(function (req, res) {
		Participations.findById(req.params.participationId, function(err, participation) {
			if (err) {
				res.status(404).send(err);
				return;
			}

			participation.participant = req.body.participant;
			participation.answers = req.body.answers;

			participation.save(function (err) {
				if (err) {
					res.send(err);
					return;
				}

				res.json({ message: 'Participation updated' });
			});
		})
	})
	/**
	 * @api {PUT} /participations/:participationId
	 * @apiName PutParticipations
	 * @apiGroup participations
	 *
	 * @apiParam {Number} participationId Prticipations unique ID.
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     "Participation deleted"
	 * 
	 */
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
