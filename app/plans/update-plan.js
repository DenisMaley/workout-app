$(document).ready(function() {

    // show html form when 'update plan' button was clicked
    $(document).on('click', '.update-plan-button', function() {

        let id = $(this).attr('data-id');

        $.getJSON(apiURL + "plan/read_one.php", {id: id}).done(function(data) {

            let update_plan_html = `
                <div id='read-plans' class='btn btn-primary pull-right m-b-15px read-plans-button'>
                    <span class='glyphicon glyphicon-list'></span> Workout Plans Overview
                </div>
  
                <form id='update-plan-form' action='#' method='post' border='0'>
                    <input value=\"` + id + `\" name='id' type='hidden' />
                    <table class='table table-hover table-responsive table-bordered'>
                        <tr>
                            <td>Name</td>
                            <td><input value=\"` + data.name + `\" type='text' name='name' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea name='description' class='form-control' required>` + data.description + `</textarea></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="text-align-center">
                                <button type='submit' class='btn btn-info'>
                                    <span class='glyphicon glyphicon-edit'></span> Update Plan
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>`;

            $("#page-content").html(update_plan_html);
            changePageTitle("Update " + name);

        }).fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    });

    $(document).on('submit', '#update-plan-form', function() {

        let form_data = JSON.stringify($(this).serializeObject());

        $.ajax({
            url: apiURL + "plan/update.php",
            type: "POST",
            contentType: 'application/json',
            data: form_data,
            success: function(result) {
                showPlans();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

        return false;
    });

});