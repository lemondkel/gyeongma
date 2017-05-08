$(function () {

    var data = [];

    var url = 'http://kradata.kra.co.kr:8082/service/api31/getOpenDataList';
    var serviceKey = 'CCA597D83CDBAC9EB536A4BCD19ED5A4644F7B7E26565D335514BEF7D58F1E';
    $.ajax({
        url: url + '?ServiceKey=' + serviceKey,
        dataType: "json"
    })
        .done(function (response) {
            // console.log(response);

            for (var i = 0; i < response.response.body.items.item.length; i++) {
                data.push(response.response.body.items.item[i]);

                var dataAddress = data[i].bsshAddr1 + " " + data[i].bsshAddr2;

                var html = "";

                html += '<tr class="gradeX">';
                html += '<td>' + data[i].bsshNm + '</td>';
                html += '<td>' + dataAddress + '</td>';
                html += '<td>' + data[i].homepage + '</td>';
                html += "</tr>";

                $("#horseRiding").append(html);
            }

            $('#horseRiding').DataTable({
                responsive: true
            });
        });

});