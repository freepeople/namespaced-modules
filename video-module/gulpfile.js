<<<<<<< HEAD
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('mocha', function() {
    return gulp.src(['test/*.js'], {
            read: false
        })
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }))
        .on('error', gutil.log);
});
gulp.task('default', function() {
    gulp.watch(['test/**'], ['mocha']);
=======
'use strict';

var fs = require('fs');
var dir = './tasks/';
var tasks = fs.readdirSync(dir);

// load gulp tasks from directory
tasks.forEach(function (task) {
    require(dir + task);
>>>>>>> 22b76ab444c782e82da3878d29d2d30908f54255
});