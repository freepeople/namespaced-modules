'use strict';
var gulp = require('gulp'),
    jsdoc = require("gulp-jsdoc");

gulp.task('jsdocs', function () {
    gulp.src('./src/scripts/*.js')
        .pipe(jsdoc('./docs'))
        .on('error', function (err) {
            console.log(err);
        });
});