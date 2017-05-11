var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var request = require('request');
var xml2js = require('xml2js');
var parser = xml2js.Parser();

var url = 'http://kradata.kra.co.kr:8082/service/api31/getOpenDataList';
var serviceKey = 'CCA597D83CDBAC9EB536A4BCD19ED5A4644F7B7E26565D335514BEF7D58F1E';
var dataAddressArr = [];
var bsshNmArr = [];
var homepageArr = [];

ajaxFunction_riding();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (dataAddressArr.length === 0) {
        ajaxFunction_riding();
    }
    else {
        res.render('horse_riding', {
            dataAddressArr: dataAddressArr,
            bsshNmArr: bsshNmArr,
            homepageArr: homepageArr
        });
    }
});

cron.schedule('* * 4 * *', function () {
    console.log('[riding]', 'starting a task every day / ' + new Date());
    dataAddressArr = [];
    bsshNmArr = [];
    homepageArr = [];

    ajaxFunction_riding();

    console.log('[riding]', 'ending a task every day / ' + new Date());
});

function ajaxFunction_riding() {

    request({
        url: url + '?ServiceKey=' + serviceKey,
        method: "GET",
        dataType: "json"
    }, function (error, response, body) {
        console.log('[승마장] 송신 성공!');

        parser.parseString(body, function (err, result) {
            // console.log(JSON.stringify(result.response.body[0].items[0].item[0]));
            for (var i = 0; i < result.response.body[0].items[0].item.length; i++) {
                var dataAddress = result.response.body[0].items[0].item[i].bsshAddr1 + " " + result.response.body[0].items[0].item[i].bsshAddr2;
                var bsshNm = result.response.body[0].items[0].item[i].bsshNm;
                var homepage = result.response.body[0].items[0].item[i].homepage;

                dataAddressArr.push(dataAddress);
                bsshNmArr.push(bsshNm);
                homepageArr.push(homepage);
            }
        });
    });
}

module.exports = router;
