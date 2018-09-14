var gulp = require("gulp");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");
var run = require("run-sequence");


gulp.task("style", function() {
  return gulp.src("src/sass/style.scss")
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style-min.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
    "src/js/**",
    "src/*.html"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style",
    done
  );
});

gulp.task("serve", function() {
    server.init({
      server: "build/"
    });

  gulp.watch("src/sass/**/*.scss", ["style"])
    .on("change", server.reload);
  gulp.watch("src/*.html", ["build"])
    .on("change", server.reload);
  gulp.watch("src/img/**", ["build"])
    .on("change", server.reload);
  gulp.watch("src/js/**", ["build"])
    .on("change", server.reload);
});
