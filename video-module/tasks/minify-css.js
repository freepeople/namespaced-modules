var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');

gulp.task('minify-css', function() {
    return gulp.src('./src/css/*')
        .pipe(minifyCSS())
        .on('error', function(err) {
            console.log(err);
        })
        .pipe(gulp.dest('./public/assets'));
});