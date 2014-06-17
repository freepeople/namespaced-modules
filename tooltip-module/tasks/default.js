'use strict';

var gulp = require('gulp');

gulp.task('default', ['compass', 'rename'], function () {
    // execute watchers
    gulp.watch('src/scss/**/*.scss', ['compass']);
    gulp.watch('src/js/*.js', ['rename']);
});