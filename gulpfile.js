"use strict";
const gulp = require("gulp"),
      concat = require("gulp-concat"),
      uglify = require("gulp-uglify"),
      sass = require("gulp-sass"),
      rename = require("gulp-rename"),
      prefixer = require("gulp-autoprefixer"),
      maps = require("gulp-sourcemaps"),
      imagemin = require("gulp-imagemin"),
      del = require("del");

//gulp concat and uglify
gulp.task("concatScript",()=>{
    return gulp
        .src(["./js/app/jQuery.js",
              "./js/app/main.js"])
        .pipe(maps.init())
        .pipe(concat("app.js"))
        .pipe(maps.write("."))
        .pipe(gulp.dest("./js"));
});

gulp.task("uglifyScript", ["concatScript"],()=>{
    return gulp
        .src("./js/app.js")
        .pipe(uglify())
        .pipe(rename("app.min.js"))
        .pipe(gulp.dest("./js"));
});

// gulp sass 
gulp.task("sass",()=>{
    return gulp
        .src("./scss/app.scss")
        .pipe(maps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(prefixer({
            browsers: ['last 6 versions'],
            cascade: false}))
        .pipe(maps.write("."))
        .pipe(gulp.dest("./css"));
});
// clean
gulp.task("clean", ()=>{
    del(["dist", "css/app.*", "js/app.*"]);
});

//  build
gulp.task("build", ["uglifyScript", "sass"],()=>{
    return gulp
        .src(["./css/app.css", "./js/app.min.js", "index.html"], {'base': "."})
        .pipe(gulp.dest("dist"));
});

// gulp watch
gulp.task("watchFiles", ()=>{
    gulp.watch("./**/*.scss", ["sass"]);
    gulp.watch("./**/*.js", ["uglifyScript"]);
});
gulp.task("serve", ["watchFiles"]);
//default
gulp.task("default", ["clean"], ()=>{
    gulp.start("build");
});
