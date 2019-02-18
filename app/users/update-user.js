$(document).ready(function() {

    // show html form when 'update user' button was clicked
    $(document).on('click', '.update-user-button', function() {

        let id = $(this).attr('data-id');

        $.getJSON(apiURL + "user/read_one.php", {id: id}).done(function(data) {

            let update_user_html = `
                <div id='read-users' class='btn btn-primary pull-right m-b-15px read-users-button'>
                    <span class='glyphicon glyphicon-list'></span> Users Overview
                </div>
  
                <form id='update-user-form' action='#' method='post' border='0'>
                    <input value=\"` + id + `\" name='id' type='hidden' />
                    <table class='table table-hover table-responsive table-bordered'>
                        
                        <tr>
                            <td>Last Name</td>
                            <td><input value=\"` + data.lastname + `\" type='text' name='lastname' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><input value=\"` + data.firstname + `\" type='text' name='firstname' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input value=\"` + data.email + `\" type="email" name='email' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>
                                Plan
                            </td>
                            <td class="plans-selector-container"></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="text-align-center">
                                <button type='submit' class='btn btn-info'>
                                    <span class='glyphicon glyphicon-edit'></span> Update User
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>`;

            $("#page-content").html(update_user_html);

            getPlans(createPlansSelector, data.plan_id);

            changePageTitle("Update " + name);

        }).fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    });

    $(document).on('submit', '#update-user-form', function() {

        let form_data=JSON.stringify($(this).serializeObject());

        $.ajax({
            url: apiURL + "user/update.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                showUsers();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });

        return false;
    });

});