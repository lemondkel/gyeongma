hrNoArr = hrNoArr.split(',');
hrNameArr = hrNameArr.split(',');
countryArr = countryArr.split(',');
sexArr = sexArr.split(',');
rcCntTArr = rcCntTArr.split(',');
rankArr = rankArr.split(',');
ratingArr = ratingArr.split(',');

for (var i = 0; i < hrNameArr.length; i++) {
    var html = "";

    html += '<tr class="gradeX">';
    html += '<td>' + hrNoArr[i] + '</td>';
    html += '<td>' + hrNameArr[i] + '</td>';
    html += '<td>' + countryArr[i] + '</td>';
    html += '<td>' + sexArr[i] + '</td>';
    html += '<td>' + rcCntTArr[i] + '</td>';
    html += '<td>' + rankArr[i] + '</td>';
    html += '<td>' + ratingArr[i] + '</td>';
    html += "</tr>";

    $("#horseInfoTotal").append(html);
}

$('#horseInfoTotal').DataTable({
    responsive: true
});