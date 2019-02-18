$(document).ready(function() {
    showPlans();

    $(document).on('click', '.read-plans-button', function() {
        showPlans();
    });
});

function showPlans() {
    $.getJSON(apiURL + "plan/read.php", function(data) {
        let read_plans_html = `
    <!-- it will load the create plan form -->
    <div id='read-users' class='btn btn-primary pull-left m-b-15px read-users-button'>
        <span class='glyphicon glyphicon-list'></span> Users Overview
    </div>
    <div id='create-plan' class='btn btn-primary pull-right m-b-15px create-plan-button'>
        <span class='glyphicon glyphicon-plus'></span> Create Plan
    </div>
    <table class='table table-bordered table-hover'>
        <tr>
            <th class='w-25-pct'>Name</th>
            <th class='w-25-pct'>Description</th>
            <th class='w-25-pct text-align-center'>Action</th>
        </tr>`;

        $.each(data.records, function(key, val) {
            read_plans_html += `
            <tr>
                <td>` + val.name + `</td>
                <td>` + val.description + `</td>
                <td>
                    <!-- read -->
                    <button class='btn btn-primary m-r-10px read-one-plan-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Read
                    </button>
     
                    <!-- edit -->
                    <button class='btn btn-info m-r-10px update-plan-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-edit'></span> Edit
                    </button>
     
                    <!-- delete -->
                    <button class='btn btn-danger delete-plan-button' data-id='` + val.id + `'>
                        <span class='glyphicon glyphicon-remove'></span> Delete
                    </button>
                </td>
     
            </tr>`;
        });

        read_plans_html += `</table>`;

        $("#page-content").html(read_plans_html);
        changePageTitle("Workout Plans Overview");
    });

}