// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');
var preprocess = require('gulp-preprocess');
var del = require('del');
var fs = require('fs');

var shell = require('gulp-shell');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Style Dependencies
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var concatCSS = require('gulp-concat-css');

// Development Dependencies
var jshint = require('gulp-jshint');

//Browser sync dependencies
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var style = 'default';
var destinationDirectory = 'build/debug';

/* Begin clean */
gulp.task('clean', function() {
  del.sync([destinationDirectory], {force:true});
});
/* End clean */

/* Begin copy assets */
gulp.task('copy', function() {
  return gulp.src('styles/' + style + '/**')
    .pipe(gulp.dest(destinationDirectory + '/assets'));
});
/* End copy assets */

/* Begin CSS processing */
gulp.task('process-style-less', function() {
  var destinationLess = '/style.less';
  return gulp.src('styles/' + style + destinationLess)
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('style-less.css'))
    .pipe(gulp.dest(destinationDirectory + '/tmp'));
});

gulp.task('process-less', function() {
  return gulp.src('styles/default/css/**/*.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('bundle-less.css'))
    .pipe(gulp.dest(destinationDirectory + '/tmp/css'));
});

gulp.task('process-css', function() {
  return gulp.src('styles/default/css/**/*.css')
    .pipe(gulp.dest( destinationDirectory +  '/tmp/css'));
});

gulp.task('process-angular-material-css', function() {
  return gulp.src('node_modules/angular-material/angular-material.css')
    .pipe(gulp.dest( destinationDirectory + '/tmp/css'));
})

gulp.task('concat-css', ['copy','process-css', 'process-angular-material-css','process-less','process-style-less'], function () {
    return gulp.src(destinationDirectory + '/tmp/**/*.css')
    .pipe(concatCSS('app.css'))
    .pipe(gulp.dest( destinationDirectory +  '/css'));
});

gulp.task('concat-minify-css', ['copy','process-css','process-less','process-style-less'], function() {
 
    return gulp.src(destinationDirectory + '/tmp/**/*.css')
    .pipe(concatCSS('app.min.css'))
    .pipe(cssnano())    
    .pipe(gulp.dest( destinationDirectory +  '/css'));
});

gulp.task('build-css-debug', ['copy','concat-css'], function () {
    del.sync([destinationDirectory + '/tmp'], {force:true});        
});

gulp.task('build-css-release', ['copy','concat-minify-css'], function() {        
    del.sync([destinationDirectory + '/tmp'], {force:true});    
});

/* End CSS processing */

/* Begin Javascript processing */

gulp.task('lint-client', function() {
  return gulp.src( ['scripts/**/*.js','!/**/pixi.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build-javascript-release', ['copy','lint-client'], function() {

//You can also pass a file to the context i.e:
//MYOBJECT: JSON.parse(fs.readFileSync( sourceDirectory + 'file.json', 'utf8')),

var context = { ENVIRONMENT : environment };

  return gulp.src('app/scripts/main.js')
    .pipe(browserify({
      insertGlobals: true,
      shim: {
          jquery: {
              path: './node_modules/jquery/dist/jquery.js',
              exports: '$'
          }
        }      
    }))
    .pipe(preprocess({context: context}))      
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(destinationDirectory + '/scripts/'));
});

gulp.task('build-javascript-debug', ['copy','lint-client'], function() {

var context = { ENVIRONMENT : environment };

  return gulp.src('scripts/main.js')
    .pipe(browserify({
      insertGlobals: true,
      shim: {
          jquery: {
              path: './node_modules/jquery/dist/jquery.js',
              exports: '$'
          }
        }      
    }))
    .pipe(preprocess({context: context}))      
    .pipe(rename('app.js'))
    .pipe(gulp.dest(destinationDirectory + '/scripts/'));
});

/* End Javascript processing */

/* Begin HTML processing */
gulp.task('build-html', function() {

var context = {
                ENVIRONMENT : environment
              };  

  gulp.src('views/*.html')
  .pipe(preprocess({context: context}))
  .pipe(gulp.dest(destinationDirectory));
  
});
/* End HTML processing */

/* Begin serve files */
gulp.task('serve',['build-debug'], function() {
    browserSync.init({
        server: {
            baseDir: destinationDirectory,
            host: "192.168.1.75",
            middleware: function (req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Cache-Control', 'no-cache');
              
              next();
            }            
        }
    });
});
/* End serve files */

/* Begin watching for file changes*/
gulp.task('watch', function() {
  gulp.watch('styles/**/*.less', ['build-css-debug']).on('change', reload);
  gulp.watch('styles/**/*.css', ['build-css-debug']).on('change', reload);
  gulp.watch('assets/imgs/**/*.png', ['copy']).on('change', reload);  
  gulp.watch('assets/imgs/**/*.jpg', ['copy']).on('change', reload);  
  gulp.watch('assets/imgs/**/*.svg', ['copy']).on('change', reload);    
  gulp.watch('views/**/*.html', ['build-html']).on('change', reload);
  gulp.watch('scripts/**/*.js', ['build-javascript-debug']).on('change', reload);   
});
/* End watching for file changes*/

//Configure build target
gulp.task('set-debug-build', function() {
  destinationDirectory = 'build/debug';
  environment = 'debug';  
});

//Configure build target
gulp.task('set-release-build', function() {
  destinationDirectory = 'build/release';
  environment = 'release';    
});

//Command line tasks
gulp.task('build-release',  ['set-release-build', 'clean', 'copy', 'build-css-release', 'build-javascript-release', 'build-html']);
gulp.task('build-debug',    ['set-debug-build', 'clean', 'copy', 'build-css-debug', 'build-javascript-debug', 'build-html']);

//Default task
gulp.task('default', ['build-debug', 'serve', 'watch']);