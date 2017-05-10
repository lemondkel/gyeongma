dataDateArr = dataDateArr.split(',');
rcNameArr = rcNameArr.split(',');
rcGradeArr = rcGradeArr.split(',');
rcDistArr = rcDistArr.split(',');
meetArr = meetArr.split(',');

for (var i = 0; i < dataDateArr.length; i++) {

    var html = "";
    var target;

    var pgDate = dataDateArr[i].toString().replace("-", "");

    html += '<tr class="odd gradeX">';
    html += '<td data-target=' + pgDate + '>' + dataDateArr[i] + '</td>';
    html += '<td>' + rcNameArr[i] + '</td>';
    html += '<td>' + rcGradeArr[i] + '</td>';
    html += '<td>' + rcDistArr[i] + '</td>';
    html += '</tr>';

    if (meetArr[i] === '1')
        target = $('#seoulYearSchedule');
    else if (meetArr[i] === '2')
        target = $('#jejuYearSchedule');
    else
        target = $('#busanYearSchedule');

    target.children('tbody').append(html);
}