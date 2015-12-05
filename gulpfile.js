var gulp = require('gulp');
var sass = require('gulp-sass');
var typescript = require('gulp-tsc');
var browserSync = require('browser-sync').create();

// var PATHS = {
    // src: 'client/**/*.ts'
// };

gulp.task('default', ['watch']);

gulp.task('watch', ['watch.ts', 'watch.sass']);

gulp.task('setup', ['ts', 'sass'], function () {
	gulp.src(['node_modules/angular2/bundles/**/*'])
		.pipe(gulp.dest('public/javascripts/angular2'))
});

gulp.task('ts', function () {

	var tscConfig = require('./client/tsconfig.json')

	gulp.src(['client/**/*.ts'])
		.pipe(typescript(tscConfig.compilerOptions))
		.pipe(gulp.dest('public/javascripts/'))
});

gulp.task('ts.html', function () {
	gulp.src(['client/**/*.html'])
		.pipe(gulp.dest('public/javascripts/'))
});

gulp.task('watch.ts', ['ts', 'ts.html'], function () {
	return gulp
		.watch('client/**/*', ['ts', 'ts.html']);
		// .pipe(browserSync.stream());
});

gulp.task('sass', function () {
	gulp.src('./public/sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/stylesheets'))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('watch.sass', ['sass', 'browser-sync'], function () {
	gulp.watch('./public/sass/**/*.scss', ['sass']);
});

gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: "localhost:3000"
	});
});
