var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var request = require('request');
var xml2js = require('xml2js');
var parser = xml2js.Parser();

var url = 'http://kradata.kra.co.kr:8082/service/api72/getOpenDataList';
var serviceKey = 'CCA597D83CDBAC9EB536A4BCD19ED5A4644F7B7E26565D335514BEF7D58F1E';
var dataDateArr = [];
var meetArr = [];
var rcNoArr = [];
var meetTypeArr = [];
var rcDateArr = [];
var rcNameArr = [];
var rankArr = [];
var rcDistArr = [];

ajaxFunction_schedule();

/* GET home page. */
router.get('/', function (req, res, next) {

    if (dataDateArr.length === 0)
        ajaxFunction_schedule();

    if (dataDateArr.length !== 0) {
        res.render('horse_race_total_schedule', {
            dataDateArr: dataDateArr,
            meetArr: meetArr,
            rcNoArr: rcNoArr,
            meetTypeArr: meetTypeArr,
            rcDateArr: rcDateArr,
            rcNameArr: rcNameArr,
            rankArr: rankArr,
            rcDistArr: rcDistArr
        });
    }
});

cron.schedule('* * 4 * *', function () {
    console.log('[schedule]', 'starting a task every day / ' + new Date());

    rcDateArr = [];
    dataDateArr = [];
    meetArr = [];
    rcNoArr = [];
    meetTypeArr = [];
    rcNameArr = [];
    rankArr = [];
    rcDistArr = [];

    ajaxFunction_schedule();

    console.log('[schedule]', 'ending a task every day / ' + new Date());
});

function ajaxFunction_schedule() {
    var meet = 1;
    var rc_year = 2017;

    request({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet + "&rc_year=" + rc_year,
        method: "GET",
        dataType: "json"
    }, function (error, response, body) {

        parser.parseString(body, function (err, result) {
            // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
            for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                var rcDate = result.response.body[0].items[0].item[i].rcDate.toString();
                var dataYear = rcDate.substring(0, 4);
                var dataMonth = rcDate.substring(4, 6);
                var dataDay = rcDate.substring(6, 8);
                var dataDate = dataYear + "-" + dataMonth + "-" + dataDay;

                var meetType = 1;
                var meet = result.response.body[0].items[0].item[i].meet;
                var rcName = result.response.body[0].items[0].item[i].rcName;
                var rcDist = result.response.body[0].items[0].item[i].rcDist;
                var rcNo = result.response.body[0].items[0].item[i].rcNo;
                var rank = result.response.body[0].items[0].item[i].rank;

                rcDateArr.push(rcDate);
                dataDateArr.push(dataDate);
                meetTypeArr.push(meetType);
                meetArr.push(meet);
                rcNameArr.push(rcName);
                rcDistArr.push(rcDist);
                rcNoArr.push(rcNo);
                rankArr.push(rank);
            }
        });

        meet = 2;

        request({
            url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet + "&rc_year=" + rc_year,
            method: "GET",
            dataType: "json"
        }, function (error, response, body) {

            parser.parseString(body, function (err, result) {
                // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
                for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                    var rcDate = result.response.body[0].items[0].item[i].rcDate.toString();
                    var dataYear = rcDate.substring(0, 4);
                    var dataMonth = rcDate.substring(4, 6);
                    var dataDay = rcDate.substring(6, 8);
                    var dataDate = dataYear + "-" + dataMonth + "-" + dataDay;

                    var meetType = 2;
                    var meet = result.response.body[0].items[0].item[i].meet;
                    var rcName = result.response.body[0].items[0].item[i].rcName;
                    var rcDist = result.response.body[0].items[0].item[i].rcDist;
                    var rcNo = result.response.body[0].items[0].item[i].rcNo;
                    var rank = result.response.body[0].items[0].item[i].rank;

                    rcDateArr.push(rcDate);
                    dataDateArr.push(dataDate);
                    meetTypeArr.push(meetType);
                    meetArr.push(meet);
                    rcNameArr.push(rcName);
                    rcDistArr.push(rcDist);
                    rcNoArr.push(rcNo);
                    rankArr.push(rank);
                }
            });

            meet = 3;

            request({
                url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet + "&rc_year=" + rc_year,
                method: "GET",
                dataType: "json"
            }, function (error, response, body) {
                console.log('[경주(전체)] 송신 성공!' + new Date());

                parser.parseString(body, function (err, result) {
                    // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
                    for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                        var rcDate = result.response.body[0].items[0].item[i].rcDate.toString();
                        var dataYear = rcDate.substring(0, 4);
                        var dataMonth = rcDate.substring(4, 6);
                        var dataDay = rcDate.substring(6, 8);
                        var dataDate = dataYear + "-" + dataMonth + "-" + dataDay;

                        var meetType = 3;
                        var meet = result.response.body[0].items[0].item[i].meet;
                        var rcName = result.response.body[0].items[0].item[i].rcName;
                        var rcDist = result.response.body[0].items[0].item[i].rcDist;
                        var rcNo = result.response.body[0].items[0].item[i].rcNo;
                        var rank = result.response.body[0].items[0].item[i].rank;

                        rcDateArr.push(rcDate);
                        dataDateArr.push(dataDate);
                        meetTypeArr.push(meetType);
                        meetArr.push(meet);
                        rcNameArr.push(rcName);
                        rcDistArr.push(rcDist);
                        rcNoArr.push(rcNo);
                        rankArr.push(rank);
                    }
                });
            });
        });
    });
}

module.exports = router;
