$(function () {

    var data = [];

    var url = 'http://kradata.kra.co.kr:8082/service/api72/getOpenDataList';
    var serviceKey = 'CCA597D83CDBAC9EB536A4BCD19ED5A4644F7B7E26565D335514BEF7D58F1E';
    var meet = 1;
    var rc_year = 2017;
    $.ajax({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet + "&rc_year=" + rc_year,
        dataType: "json"
    })
        .done(function (response) {

            for (var i = 0; i < response.response.body.items.item.length; i++) {
                response.response.body.items.item[i].meetType = meet;
                data.push(response.response.body.items.item[i]);
            }

            meet = 2;
            $.ajax({
                url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet + "&rc_year=" + rc_year,
                dataType: "json"
            })
                .done(function (response) {

                    for (var i = 0; i < response.response.body.items.item.length; i++) {
                        response.response.body.items.item[i].meetType = meet;
                        data.push(response.response.body.items.item[i]);
                    }
                    meet = 3;
                    $.ajax({
                        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet + "&rc_year=" + rc_year,
                        dataType: "json"
                    })
                        .done(function (response) {

                            for (var i = 0; i < response.response.body.items.item.length; i++) {
                                response.response.body.items.item[i].meetType = meet;
                                data.push(response.response.body.items.item[i]);
                            }

                            data.sort(function (obj1, obj2) {
                                return obj1.rcDate > obj2.rcDate ?  -1
                                    : (obj1.rcDate < obj2.rcDate ? 1 : 0);
                            });

                            for (var j = 0; j< data.length; j++) {
                                var html = "";
                                var dataPgdate = data[j].rcDate.toString();
                                var dataYear = dataPgdate.substring(0, 4);
                                var dataMonth = dataPgdate.substring(4, 6);
                                var dataDay = dataPgdate.substring(6, 8);

                                var dataDate = dataYear + "-" + dataMonth + "-" + dataDay;

                                html += '<tr class="gradeX">';
                                html += '<td data-target=' + data[j].rcDate + '>' + dataDate + '</td>';
                                html += '<td>' + data[j].meet + '</td>';
                                html += '<td>' + data[j].rcNo + '</td>';
                                html += '<td>' + '<a href="../horseRaceInfo?meet=' + data[j].meetType
                                    + "&date=" + dataPgdate + "&matchNo=" + data[j].rcNo +  '">'
                                    + data[j].rcName + '(경주번호:' + data[j].rcNo + ')' + '</a>' + '</td>';
                                html += '<td>' + data[j].rank + '</td>';
                                html += '<td>' + data[j].rcDist + '</td>';
                                html += '</tr>';

                                $('#totalSchedule').children('tbody').append(html);
                            }

                            $('#totalSchedule').DataTable({
                                responsive: true
                            });

                        });
                });
        });

});