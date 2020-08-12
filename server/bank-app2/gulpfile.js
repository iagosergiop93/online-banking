const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('transpile', () => {
    const tsResult = gulp.src('src/**/*.ts').pipe(tsProject());
    return tsResult.pipe(gulp.dest('buid'));
});