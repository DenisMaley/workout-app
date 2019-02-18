$(document).ready(function() {

    $(document).on('click', '.read-one-user-button', function() {
        let id = $(this).attr('data-id');

        $.getJSON(apiURL + "user/read_one.php", {id: id}).done(function(data) {
            let read_one_user_html = `
            <div id='read-users' class='btn btn-primary pull-right m-b-15px read-users-button'>
                <span class='glyphicon glyphicon-list'></span> Users Overview
            </div>
            
            <table class='table table-bordered table-hover'>
                <tr>
                    <td class='w-30-pct'>Lastname</td>
                    <td class='w-70-pct'>` + data.lastname +  `</td>
                </tr>
                <tr>
                    <td>Firstname</td>
                    <td>` + data.firstname + `</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>` + data.email + `</td>
                </tr>
                <tr>
                    <td>Plan</td>
                    <td>
                        <a class='read-one-plan-button' data-id='` +  data.plan.id + `'>` + data.plan.name + `</a>
                    </td>
                </tr>
            </table>`;

            $("#page-content").html(read_one_user_html);
            changePageTitle(data.lastname + ' ' + data.firstname);

        }).fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    });
});