const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles', function(){
    return gulp.src("src/sass/**/*.+(sass|scss)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(rename({suffix: ".min"}))
            .pipe(autoprefixer({browsers: ['last 2 version'], cascade: false}))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    gulp.watch("src/sass/**/*.+(sass|scss)", gulp.parallel('styles'))
    gulp.watch("src/*.html").on("change", browserSync.reload)
});

gulp.task('default', gulp.parallel('watch','server', 'styles'));