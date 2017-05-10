jkNoArr = jkNoArr.split(',');
jkNameArr = jkNameArr.split(',');
partArr = partArr.split(',');
ageArr = ageArr.split(',');
rcCntTArr = rcCntTArr.split(',');
ord1CntTArr = ord1CntTArr.split(',');


for (var i = 0; i < jkNoArr.length; i++) {
    var html = "";

    html += '<tr class="gradeX">';
    html += '<td>' + jkNoArr[i] + '</td>';
    html += '<td>' + jkNameArr[i] + '</td>';
    html += '<td>' + partArr[i] + '</td>';
    html += '<td>' + ageArr[i] + '</td>';
    html += '<td>' + rcCntTArr[i] + '</td>';
    html += '<td>' + ord1CntTArr[i] + '</td>';
    html += "</tr>";

    $("#horseJockey").append(html);
}

$('#horseJockey').DataTable({
    responsive: true
});