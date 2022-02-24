let gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

gulp.task("sass", function () {
  return gulp
    .src("./src/assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./src/assets/css"));
});
gulp.task("sass:watch", () => {
  gulp.watch("./src/assets/sass/**/*.scss", gulp.series("sass"));
});
gulp.task("postcss", () => {
  return gulp
    .src("./src/assets/css/*.css")
    .pipe(postcss([autoprefixer(), cssnano]))
    .pipe(gulp.dest("./dist/assets/css"));
});

// gulp.task('postcss:min', () => {
//     return gulp.src('./src/assets/css/*.css')
//     .pipe(postcss([cssnano]))
//     .pipe(gulp.dest('./dist/assets/css'));
// });

// gulp.task('postcss', gulp.series('postcss:prefix', 'postcss:min'));

gulp.task("copy-html", () => {
  return gulp.src("./src/index.html").pipe(gulp.dest("./dist/"));
});

gulp.task("imagemin", () => {
  return gulp
    .src("src/assets/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
  });
  gulp
    .watch("./src/assets/sass/**/*.scss", gulp.series("sass"))
    .on("change", browserSync.reload);
  gulp.watch("src/**/*.html").on("change", browserSync.reload);
});

gulp.task("concat-js", function () {
  return gulp
    .src("./src/assets/js/*.js")
    .pipe(concat("script.js"))
    .pipe(gulp.dest("./src/assets/js"));
});

gulp.task("uglify-js", function () {
  return gulp
    .src("./src/assets/js/*.js")
    .pipe(uglify("scriptUglify.js"))
    .pipe(gulp.dest("./dist/assets/js"));
});

gulp.task("build", gulp.parallel("postcss", "copy-html", "imagemin"));
