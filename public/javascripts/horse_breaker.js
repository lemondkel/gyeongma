$(function () {

    var data = [];

    var url = '	http://kradata.kra.co.kr:8082/service/api19/getOpenDataList';
    var serviceKey = '3873C2A712AE68A4B1B6AC284C2DC491E83FABE6C1315A6CE3220791267292';
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
                                return obj1.trName < obj2.trName ?  -1
                                    : (obj1.trName > obj2.trName ? 1 : 0);
                            });

                            for (var i = 0; i < data.length; i++) {
                                var html = "";

                                html += '<tr class="gradeA even">';
                                html += '<td>' + data[i].trNo + '</td>';
                                html += '<td>' + data[i].trName + '</td>';
                                html += '<td>' + data[i].part + '</td>';
                                html += '<td>' + data[i].age + '</td>';
                                html += '<td>' + data[i].rcCntT + '</td>';
                                html += '<td>' + data[i].ord1CntT + '</td>';
                                html += "</tr>";

                                $("#horseBreaker").append(html);
                            }
                            $('#horseBreaker').DataTable({
                                responsive: true
                            });
                        });
                });
        });

});