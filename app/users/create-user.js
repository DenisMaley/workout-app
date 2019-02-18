$(document).ready(function() {

    // show html form when 'create user' button was clicked
    $(document).on('click', '.create-user-button', function() {
        let create_user_html = `
                <div id='read-users' class='btn btn-primary pull-right m-b-15px read-users-button'>
                    <span class='glyphicon glyphicon-list'></span> Users Overview
                </div>
                <form id='create-user-form' action='#' method='post' border='0'>
                    <table class='table table-hover table-responsive table-bordered'>
                        <tr>
                            <td>Last Name</td>
                            <td><input type='text' name='lastname' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><input type='text' name='firstname' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="email" name='email' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>
                                Plan
                            </td>
                            <td class="plans-selector-container"></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="text-align-center">
                                <button type='submit' class='btn btn-primary '>
                                    <span class='glyphicon glyphicon-ok'></span> Create User
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>`;

        $("#page-content").html(create_user_html);

        getPlans(createPlansSelector);

        changePageTitle("Create User");
    });

    $(document).on('submit', '#create-user-form', function() {

        let raw_data = $(this).serializeObject();
        let form_data = JSON.stringify(raw_data);

        $.ajax({
            url: apiURL + "user/create.php",
            type: "POST",
            contentType: 'application/json',
            data: form_data,
            success: function(result) {
                showUsers();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

        return false;
    });
});

function getPlans(callback) {

    var callback_argument = arguments[1];

    $.getJSON(apiURL + "plan/read.php", function(data) {
        callback(data.records, callback_argument);
    });
}

function createPlansSelector(workout_plans, selected_option) {

    // Default value
    let default_plan = {
        "id": "",
        "name": "Select a workout plan",
        "description": ""
    };

    workout_plans.unshift(default_plan);

    let plans_selector_html = `<select name='plan_id' class='form-control text-align-center' required>`;

    $.each(workout_plans, function(key, val) {
        if(selected_option === val.id){
            plans_selector_html += `<option selected="selected" value='` + val.id + `'>` + val.name + `</option>`;
        } else {
            plans_selector_html += `<option value='` + val.id + `'>` + val.name + `</option>`;
        }
    });

    plans_selector_html += `</select>`;

    $('.plans-selector-container').html(plans_selector_html);
}