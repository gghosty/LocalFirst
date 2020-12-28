'use strict';

var del = require('del'); // Delete Something
var gulp = require('gulp'); // Gulp
var gulpSequence = require('gulp-sequence') // Gulp tasks in one task serial&parellel
var newer = require('gulp-newer') // Gulp newer files only upload
var scss = require('gulp-sass'); // Gulp SCSS to CSS
var sourcemaps   = require('gulp-sourcemaps'); // Gulp SourceMap in CSS
var concat = require('gulp-concat'); // Gulp CSS in One file
var autoprefixer = require('gulp-autoprefixer'); // Gulp CSS autoprefixer
var browserSync = require('browser-sync').create(); // Server
var plumber = require('gulp-plumber'); // Checks Errors In SCSS
var htmlmin = require('gulp-htmlmin'); // Minimize HTML
var cssnano = require('gulp-cssnano'); // Minimize CSS
var minify = require('gulp-minify');   //Minimize JS
var fileinclude = require('gulp-file-include');   //Include File In HTML

gulp.task('css', function() {    
	return gulp.src('markup/src/css/*.*')
	.pipe(newer('markup/build/css/'))
  .pipe(gulp.dest('markup/build/css/'));
});


//Del Build
gulp.task('del_build', function() {
	del('markup/build');
});

//Task Create CSS from SCSS
gulp.task('scss', function() {
	return gulp.src('markup/src/**/*.scss')
	.pipe(plumber())
  .pipe(autoprefixer({
      Browserslist: ['last 4 versions'],
      cascade: false
  }))
	.pipe(sourcemaps.init())
	.pipe(scss())
	.pipe(concat('styles.css'))
	// .pipe(cssnano()) //Mini
	.pipe(sourcemaps.write('.')) // Dot if sourcemap separate file
	.pipe(gulp.dest('markup/build/css'));
});

//Task HTML
gulp.task('html', function() {
	return gulp.src(['markup/src/**/*.html','!markup/src/**/_*.html'])
	.pipe(fileinclude())
	.pipe(newer('markup/build/'))
	//.pipe(htmlmin({ collapseWhitespace: true })) //Mini	
	.pipe(gulp.dest('markup/build/'));
})

//Task IMG to Buil
gulp.task('img', function() {
	return gulp.src('markup/src/img/**/*.*')
	.pipe(newer('markup/build/img/'))
	.pipe(gulp.dest('markup/build/img/'));
})

//Task JS to Build and Mini
gulp.task('js', function() {
	return gulp.src('markup/src/js/**/*.*')
	.pipe(newer('markup/build/js/'))
	.pipe(minify({
    ext:{
      src:'-debug.js',
      min:'.js'
    }}))
	.pipe(gulp.dest('markup/build/js/'));
})

//Task Fonts To Build
gulp.task('fonts', function() {
	return gulp.src('markup/src/fonts/**/*.*')
	.pipe(newer('markup/build/fonts/'))
	.pipe(gulp.dest('markup/build/fonts/'));
})

//Task Watch for channges img, scss, js, html
gulp.task('watchs', function() {
	gulp.watch('markup/src/img/**/*.*', ['img']);
	gulp.watch('markup/src/css/**/*.*', ['css']);
	gulp.watch('markup/src/**/*.scss', ['scss']);
	gulp.watch('markup/src/**/*.js', ['js']);
	gulp.watch('markup/src/**/*.html', ['html']);
})

//Task Server
gulp.task('server', function() {
  browserSync.init({
    server: {
       baseDir: "markup/build"
    }
  });
  // gulp.watch("markup/src/**/*.scss", ['scss']);
  gulp.watch("markup/build/**/*.*").on('change', browserSync.reload);
});


//Run Server width Watch
gulp.task('watch', gulpSequence('del_build', 'scss', 'css', 'html', 'img', 'js', 'fonts', ['watchs','server']))