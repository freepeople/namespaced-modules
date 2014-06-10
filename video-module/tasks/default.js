var gulp = require('gulp');
gulp.task('build', ['minify-css', 'uglify', 'test-specs', 'jsdocs']);