var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var request = require('request');
var xml2js = require('xml2js');
var parser = xml2js.Parser();

var url = '	http://kradata.kra.co.kr:8082/service/api8/getOpenDataList';
var serviceKey = 'E3E472B8DAC71C17535647AF33238C57B4B310E5476B6F177EC37132666C3F';

var data = [];

ajaxFunction_infoTotal();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (data.length === 0) {
        ajaxFunction_infoTotal();
    } else {
        var result = JSON.stringify(data);
        result = result.toString().replace(/'/gi, '"');

        res.render('horse_info_total', {
            data : result
        });
    }
});

cron.schedule('* * 4 * *', function () {
    console.log('[infoTotal]', 'starting a task every day / ' + new Date());

    data = [];

    ajaxFunction_infoTotal();

    console.log('[infoTotal]', 'ending a task every day / ' + new Date());
});

function ajaxFunction_infoTotal() {
    var meet = 1;

    request({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
        method: "GET",
        dataType: "json"
    }, function (error, response, body) {

        parser.parseString(body, function (err, result) {
            for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                var item = {
                    hrNo :  result.response.body[0].items[0].item[i].hrNo,
                    hrName : result.response.body[0].items[0].item[i].hrName,
                    name : result.response.body[0].items[0].item[i].name,
                    sex : result.response.body[0].items[0].item[i].sex,
                    rcCntT : result.response.body[0].items[0].item[i].rcCntT,
                    rank : result.response.body[0].items[0].item[i].rank,
                    rating : result.response.body[0].items[0].item[i].rating,
                    meet : meet
                };

                data.push(item);
            }
        });

        meet = 2;

        request({
            url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
            method: "GET",
            dataType: "json"
        }, function (error, response, body) {

            parser.parseString(body, function (err, result) {
                for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                    var item = {
                        hrNo :  result.response.body[0].items[0].item[i].hrNo,
                        hrName : result.response.body[0].items[0].item[i].hrName,
                        name : result.response.body[0].items[0].item[i].name,
                        sex : result.response.body[0].items[0].item[i].sex,
                        rcCntT : result.response.body[0].items[0].item[i].rcCntT,
                        rank : result.response.body[0].items[0].item[i].rank,
                        rating : result.response.body[0].items[0].item[i].rating,
                        meet : meet
                    };

                    data.push(item);
                }
            });

            meet = 3;

            request({
                url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
                method: "GET",
                dataType: "json"
            }, function (error, response, body) {
                console.log("[경주마] 송신 성공!" + new Date());

                parser.parseString(body, function (err, result) {
                    for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                        var item = {
                            hrNo :  result.response.body[0].items[0].item[i].hrNo,
                            hrName : result.response.body[0].items[0].item[i].hrName,
                            name : result.response.body[0].items[0].item[i].name,
                            sex : result.response.body[0].items[0].item[i].sex,
                            rcCntT : result.response.body[0].items[0].item[i].rcCntT,
                            rank : result.response.body[0].items[0].item[i].rank,
                            rating : result.response.body[0].items[0].item[i].rating,
                            meet : meet
                        };

                        data.push(item);
                    }
                });
            });
        });
    });
}

module.exports = router;
