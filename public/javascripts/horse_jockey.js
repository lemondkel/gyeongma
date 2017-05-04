$(function () {

    var data = [];

    var url = 'http://kradata.kra.co.kr:8082/service/api12/getOpenDataList';
    var serviceKey = '57B72987563A5B0774417FF50FB1FB280A1CA6037CA8B1E6DF419C87BA341';
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
                                return obj1.jkName < obj2.jkName ?  -1
                                    : (obj1.jkName > obj2.jkName ? 1 : 0);
                            });

                            for (var i = 0; i < data.length; i++) {
                                var html = "";

                                html += '<tr class="gradeX">';
                                html += '<td>' + data[i].jkNo + '</td>';
                                html += '<td>' + data[i].jkName + '</td>';
                                html += '<td>' + data[i].part + '</td>';
                                html += '<td>' + data[i].age + '</td>';
                                html += '<td>' + data[i].rcCntT + '</td>';
                                html += '<td>' + data[i].ord1CntT + '</td>';
                                html += "</tr>";

                                $("#horseJockey").append(html);
                            }

                            $('#horseJockey').DataTable({
                                responsive: true
                            });

                        });
                });
        });

});