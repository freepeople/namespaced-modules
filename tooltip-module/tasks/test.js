'use strict';

var gulp = require('gulp'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('test', function () {
    return gulp
        .src('./test/*.html')
        .pipe(mochaPhantomJS({reporter: 'spec'}));
});