
dataDateArr = dataDateArr.split(',');
meetArr = meetArr.split(',');
rcNoArr = rcNoArr.split(',');
meetTypeArr = meetTypeArr.split(',');
rcDateArr = rcDateArr.split(',');
rcNameArr = rcNameArr.split(',');
rankArr = rankArr.split(',');
rcDistArr = rcDistArr.split(',');

for (var i = 0; i < dataDateArr.length; i++) {
    var html = "";

    html += '<tr class="gradeX">';
    html += '<td data-target=' + rcDateArr[i] + '>' + dataDateArr[i] + '</td>';
    html += '<td>' + meetArr[i] + '</td>';
    html += '<td>' + rcNoArr[i] + '</td>';
    html += '<td>' + '<a href="../horseRaceInfo?meet=' + meetTypeArr[i]
        + "&date=" + rcDateArr[i] + "&matchNo=" + rcNoArr[i] +  '">'
        + rcNameArr[i] + '(경주번호:' + rcNoArr[i] + ')' + '</a>' + '</td>';
    html += '<td>' + rankArr[i] + '</td>';
    html += '<td>' + rcDistArr[i] + '</td>';
    html += '</tr>';

    $('#totalSchedule').children('tbody').append(html);
}

$('#totalSchedule').DataTable({
    responsive: true
});