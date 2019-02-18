$(document).ready(function() {

    // show html form when 'create plan' button was clicked
    $(document).on('click', '.create-plan-button', function() {

        $.getJSON(apiURL + "day/read.php", function(data) {

            let day_index = 1;

            // Default value
            let default_day = {
                "id": "",
                "name": "Select a workout day",
                "description": ""
            };

            let workout_days = data.records;
            workout_days.unshift(default_day);

            let days_selector_html = createDaysSelector(day_index, workout_days);

            //let days_list_html = createDaysList(workout_days);

            let create_plan_html = `
                <div id='read-plans' class='btn btn-primary pull-right m-b-15px read-plans-button'>
                    <span class='glyphicon glyphicon-list'></span> Workout Plans Overview
                </div>
                <form id='create-plan-form' action='#' method='post' border='0'>
                    <table class='table table-hover table-responsive table-bordered'>
                        <tr>
                            <td>Name</td>
                            <td><input type='text' name='name' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea name='description' class='form-control' required></textarea></td>
                        </tr>
                        <tr>
                            <td>
                                Days
                            </td>
                            <td>
                                <table class='table table-condensed table-responsive no-border' id='days-table'>
                                    <tbody>`
                                    + days_selector_html +
                                    `</tbody>
                                </table>
                                <button type='button' class='btn btn-primary add-day-button'>
                                    <span class='glyphicon glyphicon-plus'></span> Add Day
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="text-align-center">
                                <button type='submit' class='btn btn-primary '>
                                    <span class='glyphicon glyphicon-ok'></span> Create Plan
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>`;

            $("#page-content").html(create_plan_html);

            changePageTitle("Create Plan");

            $(document).on('click', '.add-day-button', function() {
                day_index++;
                let days_selector_html = createDaysSelector(day_index, workout_days);
                $('#days-table tbody').append(days_selector_html);
            });

        });
    });

    $(document).on('submit', '#create-plan-form', function() {

        let raw_data = $(this).serializeObject();
        raw_data['days'] = [];

        $.each(raw_data, function(key, val) {
            if(key.indexOf('day_index_') === 0) {
                raw_data['days'].push({
                    'index': key.replace('day_index_', ''),
                    'id': val
                });
                delete raw_data[key];
            }
        });

        let form_data = JSON.stringify(raw_data);

        $.ajax({
            url: apiURL + "plan/create.php",
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

function createDaysSelector(day_index, days) {

    let days_selector_html = `<tr>`;

    days_selector_html += `<td><span class="text-align-center">` + day_index + `. ` + `</span></td>`;

    days_selector_html += `<td><select name='day_index_` + day_index + `' class='form-control text-align-center' required>`;

    $.each(days, function(key, val) {
        days_selector_html += `<option value='` + val.id + `'>` + val.name + `</option>`;
    });

    days_selector_html += `</select></td>`;
    days_selector_html += `</tr>`;

    return days_selector_html;
}