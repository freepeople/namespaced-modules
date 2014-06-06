var gulp = require('gulp');
var jsdoc = require("gulp-jsdoc");

gulp.task('jsdocs', function () {
    return gulp.src('./src/js/*')
        .pipe(jsdoc('./docs'))
        .on('error', function (err) {
            console.log(err);
        });
});