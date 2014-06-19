'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('rename', function () {
    gulp.src('src/js/*.js')
        .pipe(rename(function (path) {
            path.basename = 'app';
            path.extname = '.min.js';
        }))
        .pipe(gulp.dest('./public'));
});