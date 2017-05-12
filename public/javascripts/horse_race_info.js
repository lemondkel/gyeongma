$(function () {
    var request = new Request();
    var data = [];

    var url = 'http://kradata.kra.co.kr:8082/service/api4/getOpenDataList';
    var url2 = 'http://kradata.kra.co.kr:8082/service/api37/getOpenDataList';
    var serviceKey = 'A1A4D147BBB7E97B82A228308544A31B245CFE7BACCE6B2FE45B730B8BE42';
    var serviceKey2 = '71F43AB9FF7FE39BBF646CA49C4ABDAA2AAC21C14FDC33F223EF9EFB664AE9C2';
    var meet = request.getParameter("meet");
    var date = request.getParameter("date");
    var matchNo = request.getParameter("matchNo");

    $.ajax({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet + "&rc_date=" + date + "&rc_no=" + matchNo,
        dataType: "json"
    })
        .done(function (response) {
            var data = response.response.body.items.item;

            for (var i = 0; i < data.length; i++) {
                var html = "";

                html += '<tr class="gradeX">';
                html += '<td>' + data[i].ord + '</td>';
                html += '<td>' + data[i].chulNo + '</td>';
                html += '<td>' + data[i].hrName + '</td>';
                html += '<td>' + data[i].jkName + '</td>';
                html += '<td>' + data[i].trName + '</td>';
                html += '<td>' + data[i].owName + '</td>';
                html += '<td>' + data[i].rcTime + '</td>';
                html += '</tr>';

                $('#horseRaceInfo').children('tbody').append(html);

                var html2 = "";

                html2 += '<tr class="gradeX">';
                html2 += '<td>' + data[i].ord + '</td>';
                html2 += '<td>' + data[i].hrNo + '</td>';
                html2 += '<td>' + data[i].hrName + '</td>';
                html2 += '<td>' + '<button class="btn" style="width:100%" data-toggle="modal" '
                    + 'data-target="#myModal" onclick="drawChart(' + date + ",'" + data[i].hrNo + "'," + meet + ')">'
                    + '클릭 </button>' + '</td>';
                html2 += '</tr>';

                $('#horseScoreBoard').children('tbody').append(html2);
            }
        });
});

function Request() {
    var requestParam = "";

    //getParameter 펑션
    this.getParameter = function (param) {
        //현재 주소를 decoding
        var url = unescape(location.href);
        //파라미터만 자르고, 다시 &그분자를 잘라서 배열에 넣는다.
        var paramArr = (url.substring(url.indexOf("?") + 1, url.length)).split("&");

        for (var i = 0; i < paramArr.length; i++) {
            var temp = paramArr[i].split("="); //파라미터 변수명을 담음

            if (temp[0].toUpperCase() == param.toUpperCase()) {
                // 변수명과 일치할 경우 데이터 삽입
                requestParam = paramArr[i].split("=")[1];
                break;
            }
        }
        return requestParam;
    }
}

var plot;

function drawChart(date, hrNo, meetType) {
    var url = '	http://kradata.kra.co.kr:8082/service/api37/getOpenDataList';
    var serviceKey = '71F43AB9FF7FE39BBF646CA49C4ABDAA2AAC21C14FDC33F223EF9EFB664AE9C2';

    $.ajax({
        url: url + '?ServiceKey=' + serviceKey + "&rc_date=" + date + "&hr_no=" + hrNo + "&meet=" + meetType,
        dataType: "json"
    }).done(function (response) {
        var data = response.response.body.items.item;

        var barOptions = {
            series: {
                bars: {
                    show: true,
                    barWidth: 5,
                    barPadding: 15,  //bar padding
                    barMargin: 0      //bar간 간격
                }
            },
            cursor: {
                show: true,
                zoom: true,
                showTooltip: true
            },
            highlighter:{ show: true },                        // 마우스 오버 시 툴팁으로 데이터 보임
            xaxis: {
                ticks: [
                    [1, "<b>S1F</b>"], [10, "<b>1C</b>"], [20, "<b>2C</b>"], [30, "<b>3C</b>"]
                    , [40, "<b>4C</b>"], [50, "<b>G3F</b>"], [60, "<b>G1F</b>"]
                ]
            },
            yaxis : {
              ticks  : [
                  [10, "10"], [20, "20"], [30, "30"], [40, "40"], [50, "50"], [60, "60"]
                  ],
                margin: 15
            },
            grid: {
                margin: 10
            },
            legend : {
                show:true
            }
        };
        var barData = {
            label: "bar",
            data: [
                [1, data.ARcTimeS1f],
                [10, data.ARcTime_1c],
                [20, data.ARcTime_2c],
                [30, data.ARcTime_3c],
                [40, data.ARcTime_4c],
                [50, data.ARcTimeG3f],
                [60, data.ARcTimeG1f]
            ]
        };

        barData = barData.data.filter(function (obj) {
            if(obj[1]===0)
                return false;
            else
                return true;
        });

        plot = $.plot($("#flot-line-chart"), [barData], barOptions);
    });

}