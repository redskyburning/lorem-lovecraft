'use strict';

let path     = require('path');
let gulp     = require('gulp');
let conf     = require('./conf');
let $        = require('gulp-load-plugins')();
let through2 = require('through2');

function convertToJson() {
	return through2.obj(function(file, encoding, callback) {
		const targetString = '***target***';
		let textArray      = [];

		String(file.contents)
			.split(/[\n]{2,}/)
			.forEach((paragraph) => {
				let paragraphArray = [];

				paragraph.replace(/([a-z]\.)\s/g, `$1${targetString}`)
					.split(targetString)
					.forEach((sentence) => {
						if (sentence) {
							paragraphArray.push(sentence);
						}
					});

				textArray.push(paragraphArray);
			});

		file.contents = new Buffer(JSON.stringify(textArray));
		callback(null, file);
	});
}

gulp.task('parse', [], function() {
	return gulp.src([path.join(conf.paths.bookSrc, '/**/*.txt')])
		.pipe(convertToJson())
		.pipe($.rename({
			extname: '.json'
		}))
		.pipe($.debug())
		.pipe(gulp.dest(conf.paths.bookOutput));
});

