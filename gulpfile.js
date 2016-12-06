var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');

gulp.task('sass', function() {
  gulp.src('./src/spidercss.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./dist/'));

  gulp.src('./docs/assets/scss/base.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./docs/assets/css/'));
});

gulp.task('css', function() {
  gulp.src('./dist/spidercss.css')
    .pipe(cleanCSS())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('pug', function buildHTML() {
  return gulp.src('./docs/templates/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver({
      port: 2021,
      livereload: true
    }));
});

gulp.task('default', ['sass', 'css', 'pug', 'serve'], function() {
  gulp.watch(['./docs/templates/**/*.pug', './src/*.scss', './src/**/*.scss'], ['pug', 'sass', 'css']);
});
