'use strict';

var gulp = require('gulp');
var compass = require('gulp-compass');


// Converting scss into browser friendly css
gulp.task('compass', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            sass: 'src/scss',
            css: 'public'
        }))
        .on('error', function(err) {
            console.error(err);
        })
        .pipe(gulp.dest('./public'));
});

// Watch task to covert scss to css 
// on file change or modify
gulp.task('watch-compass', function() {
    gulp.watch(['src/scss/**'], ['compass']);
});