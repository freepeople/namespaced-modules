'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('uglify', ['rename'], function () {
    gulp.src('public/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});