$(function () {

    var data = [];

    var url = 'http://175.125.91.94/openapi/service/rest/meta/KFAstil';
    $.ajax({
        url: url
    })
        .done(function (response) {
            console.log(response);

        });

});