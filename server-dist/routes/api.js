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
    poll.questions = req.body.questions;
    poll.save(function (err) {
        if (err) {
            res.send(err);
            return;
        }
        res.status(201).send();
    });
});
router.route('/polls/:pollId')
    .get(function (req, res) {
    Polls.findById(req.params.pollId, function (err, polls) {
        if (err) {
            res.status(404).send(err);
            return;
        }
        res.json(polls);
    });
})
    .put(function (req, res) {
    Polls.findById(req.params.pollId, function (err, poll) {
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
    .delete(function (req, res) {
    Polls.remove({ _id: req.params.pollId }, function (err, poll) {
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
    participation.answers = req.body.answers;
    if (req.body._id) {
        participation._id = req.body._id;
    }
    participation.save(function (err) {
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
            res.status(404).send(err);
            return;
        }
        res.json(participations);
    });
});
router.route('/participations/:participationId')
    .put(function (req, res) {
    Participations.findById(req.params.participationId, function (err, participation) {
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
    });
})
    .delete(function (req, res) {
    Participations.remove({ _id: req.params.participationId }, function (err, participation) {
        if (err) {
            res.send(err);
            return;
        }
        res.json({ message: 'Participation deleted' });
    });
});
module.exports = router;
//# sourceMappingURL=api.js.map