$(function () {

    //seoul
    var url = 'http://kradata.kra.co.kr:8082/service/api40/getOpenDataList';
    var serviceKey = '72C194F6FEEAC8B323E85FCF1A3B68EE5617D4544A45621A4747C9D9B9C2';
    var meet = 1;
    $.ajax({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
        dataType: "json"
    })
        .done(function (response) {
            // console.log(response.response.body.items.item);
            var data = response.response.body.items.item;

            for (var i = 0; i < data.length; i++) {
                var html = "";
                // console.log(data);

                var dataPgdate = data[i].pgDate.toString();
                var dataYear = dataPgdate.substring(0, 4);
                var dataMonth = dataPgdate.substring(4, 6);
                var dataDay = dataPgdate.substring(6, 8);

                var dataDate = dataYear + "-" + dataMonth + "-" + dataDay;

                html += '<tr class="odd gradeX">';
                html += '<td data-target=' + data[i].pgDate + '>' + dataDate + '</td>';
                html += '<td>' + data[i].rcName + '</td>';
                html += '<td>' + data[i].rcGrade + '</td>';
                html += '<td>' + data[i].rcDist + '</td>';
                html += '</tr>';

                $('#seoulYearSchedule').children('tbody').append(html);
            }
        });

    //busan
    meet = 3;
    $.ajax({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
        dataType: "json"
    })
        .done(function (response) {
            // console.log(response.response.body.items.item);
            var data = response.response.body.items.item;

            for (var i = 0; i < data.length; i++) {
                var html = "";
                // console.log(data);

                var dataPgdate = data[i].pgDate.toString();
                var dataYear = dataPgdate.substring(0, 4);
                var dataMonth = dataPgdate.substring(4, 6);
                var dataDay = dataPgdate.substring(6, 8);

                var dataDate = dataYear + "-" + dataMonth + "-" + dataDay;

                html += '<tr class="odd gradeX">';
                html += '<td data-target=' + data[i].pgDate + '>' + dataDate + '</td>';
                html += '<td>' + data[i].rcName + '</td>';
                html += '<td>' + data[i].rcGrade + '</td>';
                html += '<td>' + data[i].rcDist + '</td>';
                html += '</tr>';

                $('#busanYearSchedule').children('tbody').append(html);
            }

        });
});