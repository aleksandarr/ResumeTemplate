'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglifyjs');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var gzip = require('gulp-gzip');
var livereload = require('gulp-livereload');

var gzip_options = {
  threshold: '1kb',
  gzipOptions: {
    level: 9
  }
};

gulp.task('styles', function () {
    return gulp.src('public/scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'))
        .pipe(livereload());
});
gulp.task('scripts', function () {
    return gulp.src('public/js/app.js')
        .pipe(uglify())
        .pipe(rename(function (path) {
              path.basename = 'app.min';
              path.extname = '.js';
          }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('copy-scripts', function() {
  return gulp.src([
    'public/node_modules/jquery/dist/jquery.min.js',
    'public/node_modules/handlebars/dist/handlebars.min.js',
  ])
  .pipe(gulp.dest('public/js/vendor'));
});

gulp.task('concat-vendor', function() {
  return gulp.src([
      'public/js/vendor/jquery.min.js',
      'public/js/vendor/handlebars.min.js',
  ])
  .pipe(concat('vendor.min.js'))
  .pipe(gulp.dest('public/js/vendor/'));
});


gulp.task('build-scripts', ['concat-vendor'], function() {
  return gulp.src(['public/js/vendor.min.js'])
    .pipe(gulp.dest('public/js/vendor'))
    .pipe(gulp.dest('public/js/vendor'))
    .pipe(gzip(gzip_options))
    .pipe(gulp.dest('public/js/vendor'));
});

gulp.task('build', [
  'build-scripts'
]);

gulp.task('copy', [
    'copy-scripts'
]);

gulp.task('watch', ['styles'] ,function () {
      livereload.listen();
    gulp.watch('public/scss/*.scss', ['styles']);
    gulp.watch('public/scss/partials/*.scss', ['styles']);
    gulp.watch('public/js/app.js', ['scripts']);
    gulp.watch('public/js/vendor/*.js', ['concat-vendor']);
    
});

gulp.task('default', function () {
    gulp.start('watch');
});