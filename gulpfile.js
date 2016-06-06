var gulp = require('gulp'),
    babel = require('gulp-babel'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    eslint = require('gulp-eslint'),
    beautify = require('gulp-jsbeautify'),
    open = require('gulp-open'),
    del = require('del');

gulp.task('default', ['clean', 'beautify', 'eslint', 'babel:src', 'babel:test', 'cover', 'mocha']);
gulp.task('build', ['clean', 'eslint', 'babel:src']);

gulp.task('coverage', () => {
    gulp.src('coverage/lcov-report/index.html')
        .pipe(open());
});

gulp.task('clean', () => {
    del.sync(['build', 'coverage', 'test-build']);
});

gulp.task('beautify', ['clean'], () => {
    return gulp.src('./src/**/*.js')
        .pipe(beautify())
        .pipe(gulp.dest('./src'));
}); 

gulp.task('eslint', ['beautify'], () => {
    return gulp.src('./src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

const plugins = [
    'transform-es2015-modules-commonjs',
    'transform-runtime'
];

gulp.task('babel:src', ['eslint'], () => {
    return gulp.src('./src/**/*.js')
        .pipe(babel({
            plugins: plugins
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('babel:test', ['eslint'], () => {
    return gulp.src('./test/**/*.js')
        .pipe(babel({
            plugins: plugins
        }))
        .pipe(gulp.dest('./test-build/test'));
});

gulp.task('cover', ['babel:src', 'babel:test'], () => {
    return gulp.src('build/**/*.js')
        .pipe(istanbul())
        .pipe(gulp.dest('test-build'));
});

gulp.task('mocha', ['cover'], () => {
    return gulp.src('test-build/test/**/*.js')
        .pipe(mocha({
            bail: true
        }))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({
            thresholds: {
                global: {
                    statements: 100,
                    branches: 90,
                    lines: 100,
                    functions: 100
                }
            }
        }));
});
