var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var request = require('request');
var xml2js = require('xml2js');
var parser = xml2js.Parser();

var url = '	http://kradata.kra.co.kr:8082/service/api8/getOpenDataList';
var serviceKey = 'E3E472B8DAC71C17535647AF33238C57B4B310E5476B6F177EC37132666C3F';
var hrNoArrBySeoul = [];
var hrNameArrBySeoul = [];
var countryArrBySeoul = []; // API상 name으로 되어있음
var sexArrBySeoul = [];
var rcCntTArrBySeoul = [];
var rankArrBySeoul = [];
var ratingArrBySeoul = [];

var hrNoArrByBusan = [];
var hrNameArrByBusan = [];
var countryArrByBusan = []; // API상 name으로 되어있음
var sexArrByBusan = [];
var rcCntTArrByBusan = [];
var rankArrByBusan = [];
var ratingArrByBusan = [];

var hrNoArrByJeju = [];
var hrNameArrByJeju = [];
var countryArrByJeju = []; // API상 name으로 되어있음
var sexArrByJeju = [];
var rcCntTArrByJeju = [];
var rankArrByJeju = [];
var ratingArrByJeju = [];

ajaxFunction_infoTotal();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (hrNameArrBySeoul.length === 0) {
        ajaxFunction_infoTotal();
    } else {
        res.render('horse_info_total', {
            hrNoArrBySeoul: JSON.stringify(hrNoArrBySeoul),
            hrNameArrBySeoul: JSON.stringify(hrNameArrBySeoul),
            countryArrBySeoul: JSON.stringify(countryArrBySeoul),
            sexArrBySeoul: JSON.stringify(sexArrBySeoul),
            rcCntTArrBySeoul: JSON.stringify(rcCntTArrBySeoul),
            rankArrBySeoul: JSON.stringify(rankArrBySeoul),
            ratingArrBySeoul: JSON.stringify(ratingArrBySeoul),

            hrNoArrByBusan: JSON.stringify(hrNoArrByBusan),
            hrNameArrByBusan: JSON.stringify(hrNameArrByBusan),
            countryArrByBusan: JSON.stringify(countryArrByBusan),
            sexArrByBusan: JSON.stringify(sexArrByBusan),
            rcCntTArrByBusan: JSON.stringify(rcCntTArrByBusan),
            rankArrByBusan: JSON.stringify(rankArrByBusan),
            ratingArrByBusan: JSON.stringify(ratingArrByBusan),

            hrNoArrByJeju: JSON.stringify(hrNoArrByJeju),
            hrNameArrByJeju: JSON.stringify(hrNameArrByJeju),
            countryArrByJeju: JSON.stringify(countryArrByJeju),
            sexArrByJeju: JSON.stringify(sexArrByJeju),
            rcCntTArrByJeju: JSON.stringify(rcCntTArrByJeju),
            rankArrByJeju: JSON.stringify(rankArrByJeju),
            ratingArrByJeju: JSON.stringify(ratingArrByJeju)
        });
    }
});

cron.schedule('* * 4 * *', function () {
    console.log('[infoTotal]', 'starting a task every day / ' + new Date());

    hrNoArrBySeoul = [];
    hrNameArrBySeoul = [];
    countryArrBySeoul = []; // API상 name으로 되어있음
    sexArrBySeoul = [];
    rcCntTArrBySeoul = [];
    rankArrBySeoul = [];
    ratingArrBySeoul = [];

    hrNoArrByBusan = [];
    hrNameArrByBusan = [];
    countryArrByBusan = []; // API상 name으로 되어있음
    sexArrByBusan = [];
    rcCntTArrByBusan = [];
    rankArrByBusan = [];
    ratingArrByBusan = [];

    hrNoArrByJeju = [];
    hrNameArrByJeju = [];
    countryArrByJeju = []; // API상 name으로 되어있음
    sexArrByJeju = [];
    rcCntTArrByJeju = [];
    rankArrByJeju = [];
    ratingArrByJeju = [];

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

                hrNoArrBySeoul.push(hrNo);
                hrNameArrBySeoul.push(hrName);
                countryArrBySeoul.push(country);
                sexArrBySeoul.push(sex);
                rcCntTArrBySeoul.push(rcCntT);
                rankArrBySeoul.push(rank);
                ratingArrBySeoul.push(rating);
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

                    hrNoArrByBusan.push(hrNo);
                    hrNameArrByBusan.push(hrName);
                    countryArrByBusan.push(country);
                    sexArrByBusan.push(sex);
                    rcCntTArrByBusan.push(rcCntT);
                    rankArrByBusan.push(rank);
                    ratingArrByBusan.push(rating);
                }
            });

            meet = 3;

            request({
                url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
                method: "GET",
                dataType: "json"
            }, function (error, response, body) {
                console.log('[경주마] 송신 성공!' + new Date());

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

                        hrNoArrByJeju.push(hrNo);
                        hrNameArrByJeju.push(hrName);
                        countryArrByJeju.push(country);
                        sexArrByJeju.push(sex);
                        rcCntTArrByJeju.push(rcCntT);
                        rankArrByJeju.push(rank);
                        ratingArrByJeju.push(rating);
                    }
                });
            });
        });
    });
}

module.exports = router;
