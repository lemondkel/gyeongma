var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var request = require('request');
var xml2js = require('xml2js');
var parser = xml2js.Parser();

var url = 'http://kradata.kra.co.kr:8082/service/api40/getOpenDataList';
var serviceKey = '72C194F6FEEAC8B323E85FCF1A3B68EE5617D4544A45621A4747C9D9B9C2';
var dataDateArr = [];
var rcNameArr = [];
var rcGradeArr = [];
var rcDistArr = [];
var meetArr = [];

/* GET home page. */
router.get('/', function (req, res, next) {

    if (dataDateArr.length === 0)
        ajaxFunction_index();

    if (dataDateArr.length !== 0) {
        res.render('index', {
            title: 'Express',
            dataDateArr: dataDateArr,
            rcNameArr: rcNameArr,
            rcGradeArr: rcGradeArr,
            rcDistArr: rcDistArr,
            meetArr: meetArr
        });
    }
});

cron.schedule('* * 4 * *', function () {
    console.log('[index]', 'starting a task every day / ' + new Date());

    dataDateArr = [];
    rcNameArr = [];
    rcGradeArr = [];
    rcDistArr = [];
    meetArr = [];

    ajaxFunction_index();

    console.log('[index]', 'ending a task every day / ' + new Date());
});

function ajaxFunction_index() {
    var meet = 1;

    request({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
        method: "GET",
        dataType: "json"
    }, function (error, response, body) {
        console.log('Reponse received', body);

        parser.parseString(body, function (err, result) {
            // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
            for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                var dataPgdate = result.response.body[0].items[0].item[i].pgDate.toString();
                var dataYear = dataPgdate.substring(0, 4);
                var dataMonth = dataPgdate.substring(4, 6);
                var dataDay = dataPgdate.substring(6, 8);
                var meet = 1;

                var dataDate = dataYear + "-" + dataMonth + "-" + dataDay;
                var rcName = result.response.body[0].items[0].item[i].rcName;
                var rcGrade = result.response.body[0].items[0].item[i].rcGrade;
                var rcDist = result.response.body[0].items[0].item[i].rcDist;

                dataDateArr.push(dataDate);
                rcNameArr.push(rcName);
                rcGradeArr.push(rcGrade);
                rcDistArr.push(rcDist);
                meetArr.push(meet);
            }
        });

        meet = 2;

        request({
            url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
            method: "GET",
            dataType: "json"
        }, function (error, response, body) {
            console.log('Reponse received', body);

            parser.parseString(body, function (err, result) {
                // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
                for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                    var dataPgdate = result.response.body[0].items[0].item[i].pgDate.toString();
                    var dataYear = dataPgdate.substring(0, 4);
                    var dataMonth = dataPgdate.substring(4, 6);
                    var dataDay = dataPgdate.substring(6, 8);
                    var meet = 2;

                    var dataDate = dataYear + "-" + dataMonth + "-" + dataDay;
                    var rcName = result.response.body[0].items[0].item[i].rcName;
                    var rcGrade = result.response.body[0].items[0].item[i].rcGrade;
                    var rcDist = result.response.body[0].items[0].item[i].rcDist;

                    dataDateArr.push(dataDate);
                    rcNameArr.push(rcName);
                    rcGradeArr.push(rcGrade);
                    rcDistArr.push(rcDist);
                    meetArr.push(meet);
                }
            });

            meet = 3;

            request({
                url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
                method: "GET",
                dataType: "json"
            }, function (error, response, body) {
                console.log('Reponse received', body);

                parser.parseString(body, function (err, result) {
                    // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
                    for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                        var dataPgdate = result.response.body[0].items[0].item[i].pgDate.toString();
                        var dataYear = dataPgdate.substring(0, 4);
                        var dataMonth = dataPgdate.substring(4, 6);
                        var dataDay = dataPgdate.substring(6, 8);
                        var meet = 3;

                        var dataDate = dataYear + "-" + dataMonth + "-" + dataDay;
                        var rcName = result.response.body[0].items[0].item[i].rcName;
                        var rcGrade = result.response.body[0].items[0].item[i].rcGrade;
                        var rcDist = result.response.body[0].items[0].item[i].rcDist;

                        dataDateArr.push(dataDate);
                        rcNameArr.push(rcName);
                        rcGradeArr.push(rcGrade);
                        rcDistArr.push(rcDist);
                        meetArr.push(meet);

                        console.log(meetArr.length);
                    }
                });
            });
        });
    });
}

module.exports = router;
