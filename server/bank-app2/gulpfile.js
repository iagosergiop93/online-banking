const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

const transpile = () => {
    const tsResult = gulp.src('src/**/*').pipe(tsProject());
    return tsResult.pipe(gulp.dest('build'));
}
gulp.task('transpile', transpile);


const moveResources = () => {
    return gulp.src('src/resources/*')
            .pipe(gulp.dest('build/resources'));
}
gulp.task('moveResources', moveResources);


exports.default = gulp.series(transpile, moveResources);