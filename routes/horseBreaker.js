var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var request = require('request');
var xml2js = require('xml2js');
var parser = xml2js.Parser();

var url = '	http://kradata.kra.co.kr:8082/service/api19/getOpenDataList';
var serviceKey = '3873C2A712AE68A4B1B6AC284C2DC491E83FABE6C1315A6CE3220791267292';
var trNoArr = [];
var trNameArr = [];
var partArr = [];
// var ageArr = [];
var rcCntTArr = [];
var ord1CntTArr = [];

ajaxFunction_breaker();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (trNameArr.length === 0) {
        ajaxFunction_breaker();
    } else {
        res.render('horse_breaker', {
            trNoArr : trNoArr,
            trNameArr : trNameArr,
            partArr : partArr,
            // ageArr : ageArr,
            rcCntTArr : rcCntTArr,
            ord1CntTArr : ord1CntTArr
        });
    }
});

cron.schedule('* * 4 * *', function () {
    console.log('[breaker]', 'starting a task every day / ' + new Date());

    trNoArr = [];
    trNameArr = [];
    partArr = [];
    // ageArr = [];
    rcCntTArr = [];
    ord1CntTArr = [];

    ajaxFunction_breaker();

    console.log('[breaker]', 'ending a task every day / ' + new Date());
});

function ajaxFunction_breaker() {
    var meet = 1;

    request({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
        method: "GET",
        dataType: "json"
    }, function (error, response, body) {

        parser.parseString(body, function (err, result) {
            // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
            for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                var trNo = result.response.body[0].items[0].item[i].trNo;
                var trName = result.response.body[0].items[0].item[i].trName;
                var part = result.response.body[0].items[0].item[i].part;
                // var age = result.response.body[0].items[0].item[i].age;
                var rcCntT = result.response.body[0].items[0].item[i].rcCntT;
                var ord1CntT = result.response.body[0].items[0].item[i].ord1CntT;

                trNoArr.push(trNo);
                trNameArr.push(trName);
                partArr.push(part);
                // ageArr.push(age);
                rcCntTArr.push(rcCntT);
                ord1CntTArr.push(ord1CntT);
            }
        });

        meet = 2;

        request({
            url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
            method: "GET",
            dataType: "json"
        }, function (error, response, body) {

            parser.parseString(body, function (err, result) {
                // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
                for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                    var trNo = result.response.body[0].items[0].item[i].trNo;
                    var trName = result.response.body[0].items[0].item[i].trName;
                    var part = result.response.body[0].items[0].item[i].part;
                    // var age = result.response.body[0].items[0].item[i].age;
                    var rcCntT = result.response.body[0].items[0].item[i].rcCntT;
                    var ord1CntT = result.response.body[0].items[0].item[i].ord1CntT;

                    trNoArr.push(trNo);
                    trNameArr.push(trName);
                    partArr.push(part);
                    // ageArr.push(age);
                    rcCntTArr.push(rcCntT);
                    ord1CntTArr.push(ord1CntT);
                }
            });

            meet = 3;

            request({
                url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
                method: "GET",
                dataType: "json"
            }, function (error, response, body) {
                console.log('[조교사] 송신 성공!');

                parser.parseString(body, function (err, result) {
                    // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
                    for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                        var trNo = result.response.body[0].items[0].item[i].trNo;
                        var trName = result.response.body[0].items[0].item[i].trName;
                        var part = result.response.body[0].items[0].item[i].part;
                        // var age = result.response.body[0].items[0].item[i].age;
                        var rcCntT = result.response.body[0].items[0].item[i].rcCntT;
                        var ord1CntT = result.response.body[0].items[0].item[i].ord1CntT;

                        trNoArr.push(trNo);
                        trNameArr.push(trName);
                        partArr.push(part);
                        // ageArr.push(age);
                        rcCntTArr.push(rcCntT);
                        ord1CntTArr.push(ord1CntT);
                    }
                });
            });
        });
    });
}

module.exports = router;
