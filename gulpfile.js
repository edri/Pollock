'use strict'

let gulp = require('gulp')
let sass = require('gulp-sass')
let typescript = require('gulp-tsc')
let browserSync = require('browser-sync').create()

gulp.task('default', ['watch']);

gulp.task('watch', ['watch.ts', 'watch.sass'])

gulp.task('setup', ['ts', 'sass'], () => {
	gulp.src(['node_modules/angular2/bundles/**/*'])
		.pipe(gulp.dest('public/javascripts/angular2'))
})

gulp.task('ts', () => {
	let tscConfig = require('./client/tsconfig.json')

	var tsResult = gulp
		.src(['client/**/*.ts'])
		.pipe(typescript(tscConfig.compilerOptions));

	return tsResult.pipe(gulp.dest('public/javascripts/'));
})

gulp.task('ts.html', () => {
	gulp.src(['client/**/*.html'])
		.pipe(gulp.dest('public/javascripts/'))
})

gulp.task('watch.ts', ['ts', 'ts.html'], () => {
	gulp.watch('client/**/*', ['ts', 'ts.html'])
		// .pipe(browserSync.stream());
})

gulp.task('sass', () => {
	return gulp.src('./public/sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/stylesheets'))
		.pipe(browserSync.stream({match: '**/*.css'}))
})

gulp.task('watch.sass', ['sass', 'browser-sync'], function () {
	gulp.watch('./public/sass/**/*.scss', ['sass'])
})

gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: "localhost:3000"
	})
})
