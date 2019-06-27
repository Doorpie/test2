const gulp = require('gulp'),
    minCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    del  =  require('del'),
    concat  =  require('gulp-concat'),
    rename = require("gulp-rename");


const config = {
   src: "./src", // директория с исходниками
   build: "./dist" // Директория сборки
};

gulp.task('directories', function () {
    return gulp.src('*.*', {read: false})
        .pipe(gulp.dest('./src'))
        .pipe(gulp.dest('./dist'))
        .pipe(gulp.dest('./src/styles/saas/blocks'))
        .pipe(gulp.dest('./src/styles/css'))
        .pipe(gulp.dest('./src/js'))
        .pipe(gulp.dest('./src/fonts'))
        .pipe(gulp.dest('./src/js'))
        .pipe(gulp.dest('./src/img'));
});

gulp.task('min-css', function(){
    return gulp.src('src/css/*.css')
    .pipe(rename({suffix: ".min"}))
    .pipe(minCss())
    .pipe(gulp.dest('build/css'));
});

gulp.task('min-js', function() {

    return gulp.src("src/js/*.js")
    .pipe(rename({suffix: ".min"}))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
    
});

gulp.task('min', gulp.series('min-css', 'min-js'));


//clean для очистки каталога /dist/ перед сборкой

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('watch', function () {
    gulp.watch('src/css/**/*.css', gulp.series('min'));
});

// gulp.task('build', ['clean', 'min-css', 'min-js'], function() {
//     var buildCss = gulp.src([
//       'src/css/libs.min.css',
//       'src/css/main.css'
//     ])
//     .pipe(gulp.dest('dist/css'));
  
//     var buildFonts = gulp.src('src/fonts/**/*')
//     .pipe(gulp.dest('dist/fonts'));
  
//     var buildJs = gulp.src('src/js/**/*')
//     .pipe(gulp.dest('dist/js'));
  
//     var buildHtml = gulp.src('src/*.html')
//     .pipe(gulp.dest('dist'));
//   });