const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const stylelint = require('gulp-stylelint');
const babel = require('gulp-babel');

const reload = browserSync.reload;

gulp.task('lint-javascript', () => (
  gulp.src(['./*js', './src/js/*.js', './routes/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
));

gulp.task('lint-scss', () => (
  gulp.src('src/sass/*.scss').pipe(stylelint({
    reporters: [{ formatter: 'string', console: true }],
  }))
));

gulp.task('sass', () => (
  gulp.src('./src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/stylesheets'))
));

gulp.task('babel', () => (
  gulp.src('./src/js/*.js')
  .pipe(babel())
  .pipe(gulp.dest('./public/javascripts'))
));

gulp.task('serve', () => {
  browserSync.init(null, {
    proxy: 'localhost:3000',
  });

  gulp.watch('./views/*.pug').on('change', reload);
  gulp.watch('./src/js/*.js', ['babel']);
  gulp.watch(['./*.js', './src/js/*.js', './routes/*.js'], ['lint-javascript', reload]);
  gulp.watch('src/sass/*.scss', ['sass', 'lint-scss', reload]);
});

gulp.task('default', ['lint-scss', 'lint-javascript', 'babel', 'sass', 'serve']);
