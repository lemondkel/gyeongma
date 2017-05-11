for (var i = 0; i < hrNoArrBySeoul.length; i++) {
    var html = "";

    html += '<tr class="gradeX">';
    html += '<td>' + hrNoArrBySeoul[i] + '</td>';
    html += '<td>' + hrNameArrBySeoul[i] + '</td>';
    html += '<td>' + countryArrBySeoul[i] + '</td>';
    html += '<td>' + sexArrBySeoul[i] + '</td>';
    html += '<td>' + rcCntTArrBySeoul[i] + '</td>';
    html += '<td>' + rankArrBySeoul[i] + '</td>';
    html += '<td>' + ratingArrBySeoul[i] + '</td>';
    html += "</tr>";

    $("#horseInfoTotal").append(html);
}

$('#horseInfoTotal').DataTable({
    responsive: true
});