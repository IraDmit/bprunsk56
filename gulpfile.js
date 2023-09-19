const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser"); // Для минификации JS

const browserSync = require("browser-sync").create();

// Компилируем SCSS в CSS
function styles() {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
}

// Минификация HTML
function html() {
  return gulp
    .src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"))
    .on("end", browserSync.reload);
}

// Минификация JS
function scripts() {
  return gulp
    .src("./src/js/*.js")
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream());
}

// Отслеживание изменений
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });

  gulp.watch("./src/scss/*.scss", styles);
  gulp.watch("./src/*.html", html);
  gulp.watch("./src/js/*.js", scripts);
  gulp.watch("./src/images/**/*", images);
}

// Оптимизация и перенос изображений
function images() {
  return gulp.src("./src/images/**/*").pipe(gulp.dest("./dist/images"));
}

function fonts() {
  return gulp.src("./src/fonts/**/*").pipe(gulp.dest("./dist/fonts"));
}

const buildTasks = gulp.parallel(styles, html, scripts, images, fonts);

exports.watch = gulp.series(buildTasks, watchFiles);
exports.build = buildTasks;
exports.default = exports.watch;
