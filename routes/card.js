var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var request = require('request');
var xml2js = require('xml2js');
var parser = xml2js.Parser();

var url = '	http://kradata.kra.co.kr:8082/service/api1/getOpenDataList';
var serviceKey = '5BCD3AA2122DA88C1856E16756AFF397214B4479BC747D0BEEAFF7E9FEF41';
var data = [];

ajaxFunction_card();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (data.length === 0) {
        ajaxFunction_card();
    } else {
        res.render('card', {
            data: JSON.stringify(data)
        });
    }
});

cron.schedule('* * 4 * *', function () {
    console.log('[card]', 'starting a task every day / ' + new Date());
    data = [];

    ajaxFunction_card();

    console.log('[card]', 'ending a task every day / ' + new Date());
});

function ajaxFunction_card() {
    var bet_Type = 1;
    var meet = 1;
    var term = "4w";

    request({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet + '&bet_Type=' + bet_Type + '&term=' + term,
        method: "GET",
        dataType: "json"
    }, function (error, response, body) {

        parser.parseString(body, function (err, result) {
            for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                result.response.body[0].items[0].item[i].meet = meet;
                result.response.body[0].items[0].item[i].betType = bet_Type;
                data.push(result.response.body[0].items[0].item[i]);
            }
        });

        meet = 2;
        request({
            url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet + '&bet_Type=' + bet_Type + '&term=' + term,
            method: "GET",
            dataType: "json"
        }, function (error, response, body) {

            parser.parseString(body, function (err, result) {
                for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                    result.response.body[0].items[0].item[i].meet = meet;
                    result.response.body[0].items[0].item[i].betType = bet_Type;
                    data.push(result.response.body[0].items[0].item[i]);
                }
            });

            meet = 3;
            request({
                url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet + '&bet_Type=' + bet_Type + '&term=' + term,
                method: "GET",
                dataType: "json"
            }, function (error, response, body) {
                console.log("[카드] 송신 성공!" + new Date());

                parser.parseString(body, function (err, result) {
                    for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                        result.response.body[0].items[0].item[i].meet = meet;
                        result.response.body[0].items[0].item[i].betType = bet_Type;
                        data.push(result.response.body[0].items[0].item[i]);
                    }
                });
            });
        });
    });
}

module.exports = router;
