var gulp = require('gulp');
var data = require('gulp-data');
var stylus = require('gulp-stylus');

gulp.task('css', function () {
  return gulp.src('./src/styl/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('default', ['css']);