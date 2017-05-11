var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var request = require('request');
var xml2js = require('xml2js');
var parser = xml2js.Parser();

var url = 'http://kradata.kra.co.kr:8082/service/api12/getOpenDataList';
var serviceKey = '57B72987563A5B0774417FF50FB1FB280A1CA6037CA8B1E6DF419C87BA341';
var jkNoArr = [];
var jkNameArr = [];
var partArr = [];
var ageArr = [];
var rcCntTArr = [];
var ord1CntTArr = [];

ajaxFunction_jockey();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (jkNameArr.length === 0) {
        ajaxFunction_jockey();
    } else {
        res.render('horse_jockey', {
            jkNoArr : jkNoArr,
            jkNameArr : jkNameArr,
            partArr : partArr,
            ageArr : ageArr,
            rcCntTArr : rcCntTArr,
            ord1CntTArr : ord1CntTArr
        });
    }
});

cron.schedule('* * 4 * *', function () {
    console.log('[jockey]', 'starting a task every day / ' + new Date());

    jkNoArr = [];
    jkNameArr = [];
    partArr = [];
    ageArr = [];
    rcCntTArr = [];
    ord1CntTArr = [];

    ajaxFunction_jockey();

    console.log('[jockey]', 'ending a task every day / ' + new Date());
});

function ajaxFunction_jockey() {
    var meet = 1;

    request({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
        method: "GET",
        dataType: "json"
    }, function (error, response, body) {

        parser.parseString(body, function (err, result) {
            // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
            for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                var jkNo = result.response.body[0].items[0].item[i].jkNo;
                var jkName = result.response.body[0].items[0].item[i].jkName;
                var part = result.response.body[0].items[0].item[i].part;
                var age = result.response.body[0].items[0].item[i].age;
                var rcCntT = result.response.body[0].items[0].item[i].rcCntT;
                var ord1CntT = result.response.body[0].items[0].item[i].ord1CntT;

                jkNoArr.push(jkNo);
                jkNameArr.push(jkName);
                partArr.push(part);
                ageArr.push(age);
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
                    var jkNo = result.response.body[0].items[0].item[i].jkNo;
                    var jkName = result.response.body[0].items[0].item[i].jkName;
                    var part = result.response.body[0].items[0].item[i].part;
                    var age = result.response.body[0].items[0].item[i].age;
                    var rcCntT = result.response.body[0].items[0].item[i].rcCntT;
                    var ord1CntT = result.response.body[0].items[0].item[i].ord1CntT;

                    jkNoArr.push(jkNo);
                    jkNameArr.push(jkName);
                    partArr.push(part);
                    ageArr.push(age);
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
                console.log('[기수] 송신 성공!');

                parser.parseString(body, function (err, result) {
                    // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
                    for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                        var jkNo = result.response.body[0].items[0].item[i].jkNo;
                        var jkName = result.response.body[0].items[0].item[i].jkName;
                        var part = result.response.body[0].items[0].item[i].part;
                        var age = result.response.body[0].items[0].item[i].age;
                        var rcCntT = result.response.body[0].items[0].item[i].rcCntT;
                        var ord1CntT = result.response.body[0].items[0].item[i].ord1CntT;

                        jkNoArr.push(jkNo);
                        jkNameArr.push(jkName);
                        partArr.push(part);
                        ageArr.push(age);
                        rcCntTArr.push(rcCntT);
                        ord1CntTArr.push(ord1CntT);
                    }
                });
            });
        });
    });
}


module.exports = router;
