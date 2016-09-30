'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass-watch', function () {
  gulp.watch('./sass/**/*.scss', function(){
  	runSequence('sass','minify-css')
  });
});

gulp.task('minify-css',function(){
	return gulp.src('./css/*.css')
		.pipe(cleanCSS({compatibility:'ie8'}))
		.pipe(gulp.dest('./css'));
})

gulp.task('default',function(callback){
	runSequence('sass','minify-css',callback);
})

gulp.task('watch',function(callback){
	runSequence('sass','sass-watch','minify-css',callback);
})

