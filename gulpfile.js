var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var minifycss = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('css',function(){
    gulp.src(['public/css/*.css'])
	    .pipe(plumber())
	    .pipe(minifycss())
	    .pipe(gulp.dest('client/build/css'))
})
gulp.task('scripts',function(){
	gulp.src(['public/js/*.js'])
	    .pipe(jshint())
	    .pipe(jshint.reporter())
	    .pipe(plumber())
	    .pipe(uglify())
        .pipe(gulp.dest('client/build/js'))
	    .pipe(rename(
	      {
            suffix: '.min'
          }));
	gulp.src(['client/**/*.js'])
	    .pipe(jshint())
	    .pipe(jshint.reporter())
	    .pipe(plumber())
	    .pipe(uglify())
        .pipe(gulp.dest('client/build/client'))
	    .pipe(rename(
	      {
            suffix: '.min'
          }));
})
gulp.task('imagemin',function(){
	gulp.src(['public/*/*.{png,jpg,jpeg,ico}'])
	    .pipe(plumber())
	    .pipe(imagemin())
	    .pipe(gulp.dest('client/build/img'))
})
gulp.task('default',['css','imagemin','scripts'])