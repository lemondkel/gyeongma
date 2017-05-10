dataAddressArr = dataAddressArr.split(',');
bsshNmArr = bsshNmArr.split(',');
homepageArr = homepageArr.split(',');

for (var i = 0; i < dataAddressArr.length; i++) {
    var html = "";
    var target = $('#horseRiding');

    html += '<tr class="gradeX">';
    html += '<td>' + dataAddressArr[i] + '</td>';
    html += '<td>' + bsshNmArr[i] + '</td>';
    html += '<td>' + homepageArr[i] + '</td>';
    html += '</tr>';

    target.children('tbody').append(html);
}

$('#horseRiding').DataTable({
    responsive: true
});