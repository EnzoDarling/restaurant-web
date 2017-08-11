const gulp = require('gulp');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
//const concat = require('gulp-concat');
gulp.task('message', function() {
  return console.log('Gulp esta iniciando...');
});
gulp.task('views', function() {
  gulp.src('./src/views/*.pug')
  .pipe(pug({
    pretty:true/* PARA COMPRIMIR HTML ELIMINAR PRETTY{}*/
  }))
  .pipe(gulp.dest('./dist/'))
});
gulp.task('sass', function() {
  gulp.src('./src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
});
gulp.task('imageMin', function(){
  gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
});
gulp.task('minify', function () {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
gulp.task('watch', function() {
  gulp.watch('./src/views/*.pug', ['views']);
  gulp.watch('./src/sass/*.sass', ['sass']);
  gulp.watch('./src/img/*', ['imageMin']);
  gulp.watch('./src/js/*.js', ['minify']);
});
gulp.task('default', ['message', 'views', 'sass','imageMin','minify','watch']);
