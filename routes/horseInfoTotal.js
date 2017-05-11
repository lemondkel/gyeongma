var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var request = require('request');
var xml2js = require('xml2js');
var parser = xml2js.Parser();

var url = '	http://kradata.kra.co.kr:8082/service/api8/getOpenDataList';
var serviceKey = 'E3E472B8DAC71C17535647AF33238C57B4B310E5476B6F177EC37132666C3F';
var hrNoArr = [];
var hrNameArr = [];
var countryArr = []; // API상 name으로 되어있음
var sexArr = [];
var rcCntTArr = [];
var rankArr = [];
var ratingArr = [];

ajaxFunction_infoTotal();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (hrNameArr.length === 0) {
        ajaxFunction_infoTotal();
    } else {
        res.render('horse_info_total', {
            hrNoArr: hrNoArr,
            hrNameArr: hrNameArr,
            countryArr: countryArr,
            sexArr: sexArr,
            rcCntTArr: rcCntTArr,
            rankArr: rankArr,
            ratingArr: ratingArr
        });
    }
});

cron.schedule('* * 4 * *', function () {
    console.log('[infoTotal]', 'starting a task every day / ' + new Date());

    hrNoArr = [];
    hrNameArr = [];
    countryArr = []; // API상 name으로 되어있음
    sexArr = [];
    rcCntTArr = [];
    rankArr = [];
    ratingArr = [];

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
            // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
            for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                var hrNo = result.response.body[0].items[0].item[i].hrNo;
                var hrName = result.response.body[0].items[0].item[i].hrName;
                var country = result.response.body[0].items[0].item[i].name;
                var sex = result.response.body[0].items[0].item[i].sex;
                var rcCntT = result.response.body[0].items[0].item[i].rcCntT;
                var rank = result.response.body[0].items[0].item[i].rank;
                var rating = result.response.body[0].items[0].item[i].rating;

                hrNoArr.push(hrNo);
                hrNameArr.push(hrName);
                countryArr.push(country);
                sexArr.push(sex);
                rcCntTArr.push(rcCntT);
                rankArr.push(rank);
                ratingArr.push(rating);
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
                    var hrNo = result.response.body[0].items[0].item[i].hrNo;
                    var hrName = result.response.body[0].items[0].item[i].hrName;
                    var country = result.response.body[0].items[0].item[i].name;
                    var sex = result.response.body[0].items[0].item[i].sex;
                    var rcCntT = result.response.body[0].items[0].item[i].rcCntT;
                    var rank = result.response.body[0].items[0].item[i].rank;
                    var rating = result.response.body[0].items[0].item[i].rating;

                    hrNoArr.push(hrNo);
                    hrNameArr.push(hrName);
                    countryArr.push(country);
                    sexArr.push(sex);
                    rcCntTArr.push(rcCntT);
                    rankArr.push(rank);
                    ratingArr.push(rating);
                }
            });

            meet = 3;

            request({
                url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
                method: "GET",
                dataType: "json"
            }, function (error, response, body) {
                console.log('[경주마] 송신 성공!');

                parser.parseString(body, function (err, result) {
                    // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
                    for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                        var hrNo = result.response.body[0].items[0].item[i].hrNo;
                        var hrName = result.response.body[0].items[0].item[i].hrName;
                        var country = result.response.body[0].items[0].item[i].name;
                        var sex = result.response.body[0].items[0].item[i].sex;
                        var rcCntT = result.response.body[0].items[0].item[i].rcCntT;
                        var rank = result.response.body[0].items[0].item[i].rank;
                        var rating = result.response.body[0].items[0].item[i].rating;

                        hrNoArr.push(hrNo);
                        hrNameArr.push(hrName);
                        countryArr.push(country);
                        sexArr.push(sex);
                        rcCntTArr.push(rcCntT);
                        rankArr.push(rank);
                        ratingArr.push(rating);
                    }
                });
            });
        });
    });
}

module.exports = router;
