var gulp = require('gulp');
var sass = require('gulp-sass');
var typescript = require('gulp-tsc');
var browserSync = require('browser-sync').create();

gulp.task('default', ['watch']);

gulp.task('setup', ['ts', 'sass'], function () {
	gulp.src(['node_modules/angular2/bundles/**/*.js'])
		.pipe(gulp.dest('public/javascripts/angular2'))
});

gulp.task('watch.ts', ['ts'], function () {
	return gulp
		.watch('client/**/*.ts', ['ts']);
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

gulp.task('ts', function () {
	gulp.src(['client/**/*.ts'])
		.pipe(typescript({
			target: 'es5',
			experimentalDecorators: true,
			sourceMap: true,
			declaration: true
		}))
		.pipe(gulp.dest('public/javascripts/'))
});

gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: "localhost:3000"
	});
});
