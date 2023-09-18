const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");

const browserSync = require("browser-sync").create();

// Компилируем SCSS в CSS
function styles() {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream()); // автообновление стилей
}

// Минификация HTML
function html() {
  return gulp
    .src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"))
    .on("end", browserSync.reload); // автообновление HTML
}

// Отслеживание изменений
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });

  gulp.watch("./src/scss/**/*.scss", styles);
  gulp.watch("./src/*.html", html);
  gulp.watch("./src/images/**/*", images)
}

function images() {
  return gulp.src("./src/images/**/*").pipe(gulp.dest("./dist/images"));
}

exports.watch = watchFiles;
exports.build = gulp.parallel(styles, html, images);
exports.default = gulp.series(gulp.parallel(styles, html, images), watchFiles);
