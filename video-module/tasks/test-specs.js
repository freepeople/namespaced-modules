var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test-specs', function() {
    return gulp.src(['test/test-*.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }))
        .on('error', function(err) {
            console.log(err);
        })
});