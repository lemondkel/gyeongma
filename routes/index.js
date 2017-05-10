var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var request = require('request');
var xml2js = require('xml2js');
var parser = xml2js.Parser();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

cron.schedule('0 6 * * *', function () {
    console.log('[index]', 'starting a task every minute / ' + new Date());

    var url = 'http://kradata.kra.co.kr:8082/service/api40/getOpenDataList';
    var serviceKey = '72C194F6FEEAC8B323E85FCF1A3B68EE5617D4544A45621A4747C9D9B9C2';
    var meet = 1;
    var arr = [];

    request({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
        method: "GET",
        dataType: "json"
    }, function (error, response, body) {
        console.log('Reponse received', body);

        var data = response.response.body.items.item;

        for (var i = 0; i < data.length; i++)
            arr.push(data[i]);

    });

    meet = 2;

    request({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
        method: "GET",
        dataType: "json"
    }, function (error, response, body) {
        console.log('Reponse received', body);

        var data = response.response.body.items.item;

        for (var i = 0; i < data.length; i++)
            arr.push(data[i]);

    });

    meet = 3;

    request({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
        method: "GET",
        dataType: "json"
    }, function (error, response, body) {
        console.log('Reponse received', body);

        var data = response.response.body.items.item;

        for (var i = 0; i < data.length; i++)
            arr.push(data[i]);
    });
});

module.exports = router;
