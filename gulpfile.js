var gulp = require("gulp");

var sass = require("gulp-sass");

var browserSync = require("browser-sync");

gulp.task("sass", function() {
  return gulp.src("src/sass/style.scss")
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.reload({
      stream: true
  }));
});

gulp.task("watch", ["browserSync", "sass"], function() {
  gulp.watch("src/sass/**/*.scss", ["sass"]);
  gulp.watch("src/*.html", browserSync.reload);
  gulp.watch("src/js/**/*.js", browserSync.reload);
});

gulp.task("browserSync", function() {
  browserSync({
    server: {
      baseDir: "src"
    }
  });
});
