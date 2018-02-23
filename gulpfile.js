var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
let cleanCSS = require('gulp-clean-css');
var del = require('del'); 
 
var paths = {
  scripts: ['js/**/*.js'],
  images: 'images/**/*',
  css:'css/**/*'
};
 
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src` 
  return del(['build']);
});
gulp.task('scripts', ['clean'], function() {
  return gulp.src(paths.scripts)
    .pipe(concat('main.js'))    
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});


gulp.task('css', ['clean'], function() {

 // return gulp.src(['css/bootstrap.css', 'css/style.css'])
  return gulp.src(paths.css)
  .pipe(concat('main.css'))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest('build/css'));
});
 
// Copy all static images 
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task 
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});
 
// Rerun the task when a file changes 
gulp.task('watch', function() {
 // gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
// gulp.watch(paths.css, ['css']);
});
 
// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'scripts', 'images', 'css']);
//gulp.task('default', ['watch', 'images']);