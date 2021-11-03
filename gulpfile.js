const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
    // 1. whwere is my scss file
    return gulp.src('app/dist/styles/scss/**/*.scss')
    // 2. pass that file through sass compiler
    .pipe(sass())
    // 3. where do I save the compiled CSS?
    .pipe(gulp.dest('app/dist/styles/css'))
    // 4. stream changes to all browsers
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
    gulp.watch('app/dist/styles/scss/**/*.scss', style);
    gulp.watch('app/*.html').on('change', browserSync.reload);
    gulp.watch('app/dist/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;

// const { src, dest, watch, series } = require('gulp')
// const sass = require('gulp-sass')(require('sass'));

// function buildStyles() {
//   return src('index.scss')
//     .pipe(sass())
//     .pipe(dest('css'))
// }

// function watchTask() {
//   watch(['index.scss'], buildStyles)
// }

// exports.default = series(buildStyles, watchTask)