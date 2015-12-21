'use strict'

let gulp = require('gulp')
let sass = require('gulp-sass')
let ts = require('gulp-typescript')
let merge = require('merge2');
let browserSync = require('browser-sync').create()
let tsProject = ts.createProject('./client/tsconfig.json');

gulp.task('default', ['setup', 'watch']);

gulp.task('watch', ['watch.ts', 'watch.sass'])

gulp.task('setup', ['ts', 'sass'], () => {
	gulp.src(['node_modules/angular2/bundles/**/*'])
		.pipe(gulp.dest('public/javascripts/angular2'))
	gulp.src(['node_modules/rxjs/bundles/**/*'])
		.pipe(gulp.dest('public/javascripts/rxjs'))
})

// -- Typescript --

gulp.task('ts', function() {
	let tsResult = tsProject.src()
		.pipe(ts(tsProject));

	return merge([
		tsResult.dts.pipe(gulp.dest('public/javascripts/definitions')),
		tsResult.js.pipe(gulp.dest('public/javascripts'))
	]);
});

gulp.task('watch.ts', ['ts'], () => {
	gulp.watch('client/**/*.ts', ['ts'])
		// .pipe(browserSync.stream());
})

// -- SASS --

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
