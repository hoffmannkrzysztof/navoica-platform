
function getCourseProgressReq(usernameArg, courseIdArg, urlOriginArg) {
    let $progressBar = $('.course-progress');
    let urlOriginPath = urlOriginArg || window.location.origin;
    let username = usernameArg || $progressBar.data('user');
    let courseId = courseIdArg || $progressBar.data('courseid');
    let endpoint = `/api/navoica/v1/progress/${username}/courses/${courseId}`;

    $.ajax({
        url: urlOriginPath + endpoint,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function(result){
            if (result) {
                let percentage = Math.round(result.completion_value * 100);
                $('.progress-bar').css('width', percentage + '%').attr('aria-valuenow', percentage);
                $('.js-percentage-progress').text(percentage + '%');
            }
        }
    });
}


function getCourseProgressEvents() {
    $(document).ready(function() {
        getCourseProgressReq();

        $(document).on('keydown', function(event) {
            let key = event.keyCode || event.which;

            if (!$(this).is('input') && !$(this).is('textarea')) {
                switch(key) {
                    case 37:
                    case 39:
                        getCourseProgressReq();
                        break;
                    default:
                        return;
                }
            }
        });

        $('.js-sequence-btn-prev, .js-sequence-btn-next').on('click', function(event) {
            event.preventDefault();
            getCourseProgressReq();
        });

    });
}

export default getCourseProgressEvents;