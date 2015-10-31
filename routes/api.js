var express = require('express');
var router = express.Router();
var Polls = require('../models/polls');

// GET polls
router.get('/polls/:pollId', function (req, res) {
	Polls.find(function (err, polls) {
		if (err) {
			res.send(err);
		}

		res.json(polls);
	});
});

module.exports = router;
