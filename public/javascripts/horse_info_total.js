$(function () {

    var data = [];

    var url = '	http://kradata.kra.co.kr:8082/service/api8/getOpenDataList';
    var serviceKey = 'E3E472B8DAC71C17535647AF33238C57B4B310E5476B6F177EC37132666C3F';
    var meet = 1;
    $.ajax({
        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
        dataType: "json"
    })
        .done(function (response) {

            for (var i = 0; i < response.response.body.items.item.length; i++) {
                data.push(response.response.body.items.item[i]);
            }

            meet = 2;
            $.ajax({
                url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
                dataType: "json"
            })
                .done(function (response) {

                    for (var i = 0; i < response.response.body.items.item.length; i++) {
                        data.push(response.response.body.items.item[i]);
                    }
                    meet = 3;
                    $.ajax({
                        url: url + '?ServiceKey=' + serviceKey + '&meet=' + meet,
                        dataType: "json"
                    })
                        .done(function (response) {

                            for (var i = 0; i < response.response.body.items.item.length; i++) {
                                data.push(response.response.body.items.item[i]);
                            }

                            data.sort(function (obj1, obj2) {
                                return obj1.hrName < obj2.hrName ?  -1
                                    : (obj1.hrName > obj2.hrName ? 1 : 0);
                            });

                            for (var i = 0; i < data.length; i++) {
                                var html = "";

                                html += '<tr class="gradeX">';
                                html += '<td>' + data[i].hrNo + '</td>';
                                html += '<td>' + data[i].hrName + '</td>';
                                html += '<td>' + data[i].name + '</td>';
                                html += '<td>' + data[i].sex + '</td>';
                                html += '<td>' + data[i].rcCntT + '</td>';
                                html += '<td>' + data[i].rank + '</td>';
                                html += '<td>' + data[i].rating + '</td>';
                                html += "</tr>";

                                $("#horseInfoTotal").append(html);
                            }

                            $('#horseInfoTotal').DataTable({
                                responsive: true
                            });

                        });
                });
        });

});