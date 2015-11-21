var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('action', { title: 'Polls\' actions' });
});

router.get('/create', function(req, res, next) {
    res.render('actionCreate', { title: 'Create a poll' });
});

router.get('/access', function(req, res, next) {
    res.render('actionAccess', { title: 'Access a poll' });
});



module.exports = router;
