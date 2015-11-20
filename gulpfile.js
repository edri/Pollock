var gulp = require('gulp');
var typescript = require('gulp-tsc');

gulp.task('default', ['watch']);

gulp.task('watch', ['compile'], function () {
	return gulp.watch('src/**/*.ts', ['compile']);
});

gulp.task('compile', function(){
	gulp.src(['src/**/*.ts'])
		.pipe(typescript({
			target: 'es5',
			experimentalDecorators: true,
			sourceMap: true,
			declaration: true
		}))
		.pipe(gulp.dest('dist/'))
});
