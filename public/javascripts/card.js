data = JSON.parse(data);

console.log(data);

for (var i = 0; i < data.length; i++) {
    if (data[i].meet === 1) {
        var html = "";
        var target = $('#card-table');

        html += '<tr class="gradeX">';
        html += '<td>' + data[i].hitRank + '</td>';
        html += '<td>' + data[i].acno + '</td>';
        html += '<td>' + data[i].totPrchsCnt + '</td>';
        html += '<td>' + data[i].totRtnCnt + '</td>';
        html += '<td>' + data[i].totRtnHitRate + '</td>';
        html += '</tr>';

        target.children('tbody').append(html);
    }
}

target.DataTable({
    responsive: true,
    paging: false,
    searching: false
});

$('#card-place').change(function () {
    var target = $('#card-table');

    target.children('tbody').empty();

    for (var i = 0; i < data.length; i++) {
        if (data[i].meet === parseInt($('#card-place option:selected').val())) {
            var html = "";

            html += '<tr class="gradeX">';
            html += '<td>' + data[i].hitRank + '</td>';
            html += '<td>' + data[i].acno + '</td>';
            html += '<td>' + data[i].totPrchsCnt + '</td>';
            html += '<td>' + data[i].totRtnCnt + '</td>';
            html += '<td>' + data[i].totRtnHitRate + '</td>';
            html += '</tr>';

            target.children('tbody').append(html);
        }
    }
});