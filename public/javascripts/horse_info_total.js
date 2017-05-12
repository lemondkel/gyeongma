data = JSON.parse(data);

for (var i = 0; i < data.length; i++) {
    if (data[i].meet === 1) {
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
}

$('#horseInfoTotal').DataTable({
    responsive: true
});

$('#info-place').change(function () {
    var target = $('#horseInfoTotal');
    var temp = [];

    $('#horseInfoTotal').DataTable().destroy();
    target.children('tbody').empty();

    for (var i = 0; i < data.length; i++) {
        if (data[i].meet === parseInt($('#info-place option:selected').val())) {
            var html = "";
            temp.push(data[i]);

            html += '<tr class="gradeX">';
            html += '<td>' + data[i].hrNo + '</td>';
            html += '<td>' + data[i].hrName + '</td>';
            html += '<td>' + data[i].name + '</td>';
            html += '<td>' + data[i].sex + '</td>';
            html += '<td>' + data[i].rcCntT + '</td>';
            html += '<td>' + data[i].rank + '</td>';
            html += '<td>' + data[i].rating + '</td>';
            html += '</tr>';

            target.children('tbody').append(html);
        }
    }
    $('#horseInfoTotal').DataTable({
        responsive: true
    });
});