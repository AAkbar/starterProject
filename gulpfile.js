
const gulp = require("gulp"),
      concat = require("gulp-concat"),
      uglify = require("gulp-uglify"),
      sass = require("gulp-sass"),
      rename = require("gulp-rename"),
      prefixer = require("gulp-autoprefixer"),
      maps = require("gulp-sourcemaps"),
      imagemin = require("gulp-imagemin");

//gulp concat and uglify
gulp.task("concatScript",()=>{
    gulp
        .src(["./js/jQuery.js",
              "./js/main.js"])
        .pipe(maps.init())
        .pipe(concat("app.js"))
        .pipe(maps.write("."))
        .pipe(gulp.dest("./js"));
});

gulp.task("uglifyScript",()=>{
    gulp
        .src("./js/app.js")
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest("./js"));
});

// gulp sass 
gulp.task("sass",()=>{
    gulp
        .src("./scss/app.scss")
        .pipe(maps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(prefixer({
            browsers: ['last 6 versions'],
            cascade: false}))
        .pipe(maps.write("."))
        .pipe(gulp.dest("./css"));
});

// gulp watch
gulp.task("watch", ()=>{
    gulp.watch("./js/*.js", ["concatScript", "uglifyScript"]);
    gulp.watch("./**/*.scss", ["sass"]);
});

// default task
gulp.task("default", ["concatScript", "uglifyScript", "sass", "watch"]);
