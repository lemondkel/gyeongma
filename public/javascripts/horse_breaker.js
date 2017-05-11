trNoArr = trNoArr.split(',');
trNameArr = trNameArr.split(',');
partArr = partArr.split(',');
// ageArr = ageArr.split(',');
rcCntTArr = rcCntTArr.split(',');
ord1CntTArr = ord1CntTArr.split(',');


for (var i = 0; i < trNoArr.length; i++) {
    var html = "";

    html += '<tr class="gradeX">';
    html += '<td>' + trNoArr[i] + '</td>';
    html += '<td>' + trNameArr[i] + '</td>';
    html += '<td>' + partArr[i] + '</td>';
    // html += '<td>' + ageArr[i] + '</td>';
    html += '<td>' + rcCntTArr[i] + '</td>';
    html += '<td>' + ord1CntTArr[i] + '</td>';
    html += "</tr>";

    $("#horseBreaker").append(html);
}

$('#horseBreaker').DataTable({
    responsive: true
});