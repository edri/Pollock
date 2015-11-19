var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', ['watch']);

gulp.task('watch', ['compile'], function () {
	return gulp.watch('public/typescripts/**/*.ts', ['compile']);
});

gulp.task('compile', function(){
	return gulp.src(['public/typescripts/**/*.ts'])
		.pipe(ts())
		.pipe(gulp.dest('public/javascripts/angular'));
});
