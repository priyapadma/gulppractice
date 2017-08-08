var gulp = require('gulp');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');

var folder = {
    src: 'src/',
    build: 'build/'
  };
  
// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});
 
gulp.task('images', function() {
  var out = folder.build + 'images/';
  return gulp.src(folder.src + 'images/**/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});


gulp.task('useref', function(){
var out = folder.build + 'scripts/';
  return gulp.src(folder.src + '*.html')
    .pipe(useref())
    .pipe(gulp.dest(out))
});

gulp.task('fonts', function() {
  return gulp.src(folder.src + 'fonts/**/*')
  .pipe(gulp.dest(folder.build + 'fonts'))
});

gulp.task('clean',function(){
	return del.sync('build');
});

gulp.task('build', [`clean`, `useref`, `images`, `fonts`], function (){
  console.log('Building files');
});

/*gulp.task('build', function(callback){
	runSequence('clean',['useref','images','fonts'],
	callback)
});*/
