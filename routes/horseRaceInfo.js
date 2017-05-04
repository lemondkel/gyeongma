var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('horse_race_info', {
      meet : req.param("meet"),
      date : req.param("date"),
      matchNo : req.param("matchNo")
  });
});

module.exports = router;
