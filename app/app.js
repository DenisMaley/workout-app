var apiURL = 'http://localhost:8888/workout-api/api/';

$(document).ready(function() {
    let app_html = `
        <div class='container'>
            <div class='page-header'>
                <h1 id='page-title'>Workout Plans Overview</h1>
            </div>
            <!-- this is where the contents will be shown. -->
            <div id='page-content'></div>
        </div>`;

    $("#app").html(app_html);
});

function changePageTitle(page_title) {
    $('#page-title').text(page_title);
    document.title = page_title;
}

// function to make form values to json format
$.fn.serializeObject = function() {
    let object = {};
    let array = this.serializeArray();
    $.each(array, function() {
        if (object[this.name] !== undefined) {
            if (!object[this.name].push) {
                object[this.name] = [object[this.name]];
            }
            object[this.name].push(this.value || '');
        } else {
            object[this.name] = this.value || '';
        }
    });
    return object;
};