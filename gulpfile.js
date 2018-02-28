const gulp = require('gulp');
const browser = require('browser-sync').create();
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
//const concat = require('gulp-concat');
gulp.task('message', function() {
  return console.log('Gulp esta iniciando...');
});
//Server Estatico
gulp.task('browserSync', () =>{
	browser.init({
		server:{
			baseDir: "./dist"
		}
	});
});
gulp.task('views', function() {
  gulp.src('./src/views/*.pug')
  .pipe(pug({
    pretty:true/* PARA COMPRIMIR HTML ELIMINAR PRETTY{}*/
  }))
  .pipe(gulp.dest('./dist/'))
  .pipe(browser.reload({stream: true}));
});
gulp.task('sass', function() {
  gulp.src('./src/sass/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browser.reload({stream: true}));
});
gulp.task('imageMin', function(){
  gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
});
gulp.task('minify', function () {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browser.reload({stream: true}));
});
gulp.task('watch', function() {
  gulp.watch('./src/views/*.pug', ['views']);
  gulp.watch('./src/sass/*', ['sass']);
  gulp.watch('./src/img/*', ['imageMin']);
  gulp.watch('./src/js/*.js', ['minify']);
});
gulp.task('default', ['message', 'views', 'sass','imageMin','minify','watch','browserSync']);
