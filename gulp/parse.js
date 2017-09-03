'use strict';

let path    = require('path');
let gulp    = require('gulp');
let conf    = require('./conf');
let Epub    = require('epub');
let $       = require('gulp-load-plugins')();
let through2 = require('through2');

function convertEpubToJson() {
	return through2.obj(function(file, encoding, callback) {
		let epub = new Epub(file.path);

		epub.on('error',(error) => {
			callback(error);
		});

		epub.on('end',(error) => {
			$.util.log('flow:',epub.flow);

			if(!error) {
				callback(null,file);
			} else {
				return callback(error);
			}

		});

		epub.parse();
		$.util.log('contact at end');
	});
}

gulp.task('parse', [], function() {
	return gulp.src([path.join(conf.paths.bookSrc, '/**/*.epub')])
		.pipe(convertEpubToJson())
		.pipe($.debug())
		.pipe(gulp.dest(conf.paths.bookOutput));
});

