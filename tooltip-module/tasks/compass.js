'use strict';

var gulp = require('gulp');
var compass = require('gulp-compass');

// Converting scss into browser friendly css
gulp.task('compass', function() {
    gulp.src('./src/scss/**/*.scss')
        .pipe(compass({
            css: './public',
            sass: './src/scss',
            config_file: './config.rb'
        }))
        .on('error', function(err) {
            console.error(err);
        })
        .pipe(gulp.dest('./public'));
});