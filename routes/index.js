var express = require('express');
var router = express.Router();
var cron = require('node-cron');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

cron.schedule('0 6 * * *', function () {
    console.log('[index]', 'starting a task every minute / ' + new Date());
    console.log('[index]', 'ending time / ' + new Date());
});

module.exports = router;
