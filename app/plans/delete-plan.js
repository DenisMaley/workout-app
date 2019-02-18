$(document).ready(function() {

    $(document).on('click', '.delete-plan-button', function() {

        let plan_id = $(this).attr('data-id');

        // bootbox for good looking 'confirm pop up'
        bootbox.confirm({

            message: "<h4>Are you sure you want to delete the plan?</h4>",
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
                        url: apiURL + "plan/delete.php",
                        type: "POST",
                        dataType: 'json',
                        data: JSON.stringify({id: plan_id}),
                        success: function(result) {
                            showPlans();
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