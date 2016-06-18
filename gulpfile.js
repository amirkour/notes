var gulp = require('gulp'),
	data = require('gulp-data'),
	stylus = require('gulp-stylus'),
	browserify = require("gulp-browserify"),
	// babelify = require("babelify"),
	babel = require("gulp-babel"),
	concat = require("gulp-concat"),
	fs = require('fs'),
	rename = require('gulp-rename');

gulp.task('css', function () {
  return gulp.src('./src/styl/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public/css/'));
});

gulp.task("browserify", function () {
	return gulp.src("src/js/notes-app.js")
		// .pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(browserify({
			insertGlobals : true
			// ,debug : !gulp.env.production
		}))
		.pipe(rename("bundle.js"))
		.pipe(gulp.dest('public/js/'));
		// .pipe(concat("notes-app-compiled.js"))
		// .pipe(sourcemaps.write("."))
		// .pipe(gulp.dest("./src/js/"));
});

// TODO
// debug environment and sourcemaps?
// concat and lint and minify?
// gulp.task('browserify', function(){
// 	gulp.src('src/js/notes-app-compiled.js')
// 		.pipe(browserify({
// 			insertGlobals : true
// 			// ,debug : !gulp.env.production
// 		}))
// 		.pipe(rename("bundle.js"))
// 		.pipe(gulp.dest('public/js/'))
// });

gulp.task('default', ['css', 'browserify']);