var gulp = require('gulp');
var typescript = require('gulp-tsc');

gulp.task('default', ['watch']);

gulp.task('watch', ['compile'], function () {
	return gulp.watch('client/**/*.ts', ['compile']);
});


gulp.task('setup', function () {
	gulp.src(['node_modules/angular2/bundles/**/*.js'])
		.pipe(gulp.dest('public/javascripts/angular2'))
});

gulp.task('compile', function () {
	gulp.src(['client/**/*.ts'])
		.pipe(typescript({
			target: 'es5',
			experimentalDecorators: true,
			sourceMap: true,
			declaration: true
		}))
		.pipe(gulp.dest('public/javascripts/'))
});
