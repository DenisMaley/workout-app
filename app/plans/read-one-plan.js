$(document).ready(function() {

    $(document).on('click', '.read-one-plan-button', function() {
        let id = $(this).attr('data-id');

        $.getJSON(apiURL + "plan/read_one.php", {id: id}).done(function(data) {
            let read_one_plan_html = `
            <div id='read-plans' class='btn btn-primary pull-right m-b-15px read-plans-button'>
                <span class='glyphicon glyphicon-list'></span> Workout Plans Overview
            </div>
            
            <table class='table table-bordered table-hover'>
                <tr>
                    <td class='w-30-pct'>Name</td>
                    <td class='w-70-pct'>` + data.name + `</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>` + data.description + `</td>
                </tr>
                <tr>
                    <td>Days</td>
                    <td>` + createDaysTable(data.days) + `</td>
                </tr>
            </table>`;

            $("#page-content").html(read_one_plan_html);
            changePageTitle(data.name);

        }).fail(function(jqxhr, textStatus, error) {
            let err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
    });
});

function createDaysTable(days) {
    let days_block_html = `<div class = "container"><div class="panel-group" id="accordion">`;

    $.each(days, function(key, day) {
        days_block_html += createDayBlock(day)
    });

    days_block_html += `</div></div>`;

    return days_block_html;
}

function createDayBlock(day){
    let day_block_html = `
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse` + day.day_index + `">
              ` + day.day_name + `
            </a>
          </h4>
        </div>
        <div id="collapse` + day.day_index + `" class="panel-collapse collapse">
          <div class="panel-body">
            <h5>Exercises</h5> 
            ` + createExercisesBlock(day.day_exercises) + `
            <i>` + day.day_description + `</i>
          </div>
        </div>
      </div>
    `;

    return day_block_html;
}

function createExercisesBlock(exercises){
    let exercises_block_html = `<ul>`;

    $.each(exercises, function(key, exercise) {
        exercises_block_html += `<li>`;
        exercises_block_html += exercise.exercise_name + '(' + exercise.exercise_muscle + ') - ';
        exercises_block_html += exercise.exercise_sets + ' sets ' + exercise.exercise_reps + ' reps';
        exercises_block_html += `</li>`;
    });

    exercises_block_html += `</ul>`;

    return exercises_block_html;
}