function getCourseProgress(usernameArg, courseIdArg, urlOriginArg) {
    let $progressBar = $('.course-progress');
    let urlOriginPath = urlOriginArg || window.location.origin;
    let username = usernameArg || $progressBar.data('user');
    let courseId = courseIdArg || $progressBar.data('courseid');
    let endpoint = `/api/navoica/v1/progress/${username}/courses/${courseId}`;
    console.log('test api progress file', courseId, username);

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

export default getCourseProgress;