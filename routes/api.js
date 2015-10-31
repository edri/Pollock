var express = require('express');
var router = express.Router();
var Polls = require('../models/polls');

// GET polls
router.get('/polls/:pollId', function (req, res) {
	res.send('Polls');
})

module.exports = router;
