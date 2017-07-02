$(document).ready(function() {
    $('button').click(function() {
        $.ajax({
            url: '/registration_process',
            type: 'POST',
            data: {
                username: $('#username').val(),
                password: $('#password').val(),
            },
            success: function(response) {
                alertHandler(response)
            }
        });
    });
});


function alertHandler(response) {
    if (response.errormessage) {
        $('#errorAlert').text(response.errormessage).show();
        $('#successAlert').hide();
    } else {
        $('#successAlert').text(response.successmessage).show();
        $('#errorAlert').hide();
    }
}
