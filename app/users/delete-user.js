$(document).ready(function() {

    $(document).on('click', '.delete-user-button', function() {

        let user_id = $(this).attr('data-id');

        // bootbox for good looking 'confirm pop up'
        bootbox.confirm({

            message: "<h4>Are you sure you want to delete the user?</h4>",
            buttons: {
                confirm: {
                    label: '<span class="glyphicon glyphicon-ok"></span> Yes',
                    className: 'btn-danger'
                },
                cancel: {
                    label: '<span class="glyphicon glyphicon-remove"></span> No',
                    className: 'btn-primary'
                }
            },
            callback: function(result) {
                if (result === true) {
                    $.ajax({
                        url: apiURL + "user/delete.php",
                        type: "POST",
                        dataType: 'json',
                        data: JSON.stringify({id: user_id}),
                        success: function(result) {
                            showUsers();
                        },
                        error: function(xhr, resp, text) {
                            console.log(xhr, resp, text);
                        }
                    });

                }
            }
        });
    });
});