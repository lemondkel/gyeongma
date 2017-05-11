hitRankArr = hitRankArr.split(',');
acnoArr = acnoArr.split(',');
totPrchsCntArr = totPrchsCntArr.split(',');
totRtnCntArr = totRtnCntArr.split(',');
totRtnHitRateArr = totRtnHitRateArr.split(',');

for (var i = 0; i < hitRankArr.length; i++) {
    var html = "";
    var target = $('#betType1_meet1');

    html += '<tr class="gradeX">';
    html += '<td>' + hitRankArr[i] + '</td>';
    html += '<td>' + acnoArr[i] + '</td>';
    html += '<td>' + totPrchsCntArr[i] + '</td>';
    html += '<td>' + totRtnCntArr[i] + '</td>';
    html += '<td>' + totRtnHitRateArr[i] + '</td>';
    html += '</tr>';

    target.children('tbody').append(html);
}

target.DataTable({
    responsive: true,
    paging : false
});