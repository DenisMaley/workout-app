$(document).ready(function() {
    $(document).on('click', '.read-users-button', function() {
        showUsers();
    });
});

function showUsers() {
    $.getJSON(apiURL + "user/read.php", function(data) {
        let read_users_html = `
    <!-- it will load the create user form -->
    <div id='read-plans' class='btn btn-primary pull-left m-b-15px read-plans-button'>
        <span class='glyphicon glyphicon-list'></span> Workout Plans Overview
    </div>
    <div id='create-user' class='btn btn-primary pull-right m-b-15px create-user-button'>
        <span class='glyphicon glyphicon-plus'></span> Create User
    </div>
    <table class='table table-bordered table-hover'>
        <tr>
            <th class='w-25-pct'>Firstname</th>
            <th class='w-25-pct'>Lastname</th>
            <th class='w-25-pct text-align-center'>Action</th>
        </tr>`;

        $.each(data.records, function(key, val) {
            read_users_html += `
            <tr>
                <td>` + val.firstname + `</td>
                <td>` + val.lastname + `</td>
                <td>
                    <!-- read -->
                    <button class='btn btn-primary m-r-10px read-one-user-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Read
                    </button>
     
                    <!-- edit -->
                    <button class='btn btn-info m-r-10px update-user-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-edit'></span> Edit
                    </button>
     
                    <!-- delete -->
                    <button class='btn btn-danger delete-user-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-remove'></span> Delete
                    </button>
                </td>
     
            </tr>`;
        });

        read_users_html += `</table>`;

        $("#page-content").html(read_users_html);
        changePageTitle("Users Overview");
    });

}