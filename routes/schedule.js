var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('horse_race_total_schedule');
});

module.exports = router;
