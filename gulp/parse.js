'use strict';

let path       = require('path');
let gulp       = require('gulp');
let conf       = require('./conf');
let $          = require('gulp-load-plugins')();
let through2   = require('through2');
let changeCase = require('change-case');

function convertToJson() {
	let manifest      = [];
	let referenceFile = null;

	function transformFunction(file, encoding, callback) {
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

		// Change to json ext and normalize name
		let pathObj  = path.parse(file.path);
		pathObj.base = changeCase.paramCase(pathObj.name) + '.json';
		file.path    = path.format(pathObj);

		// Push info to manifest and save ref file for later if needed
		if (referenceFile === null) {
			referenceFile = file.clone();
		}
		manifest.push(path.basename(file.path));

		callback(null, file);
	}

	function flushFunction(callback) {
		let pathObj            = path.parse(referenceFile.path);
		pathObj.base           = 'manifest.json';
		referenceFile.path     = path.format(pathObj);
		referenceFile.contents = new Buffer(JSON.stringify(manifest));

		this.push(referenceFile);
		callback();
	}

	return through2.obj(transformFunction, flushFunction);
}

gulp.task('parse', [], function() {
	return gulp.src([path.join(conf.paths.bookSrc, '/**/*.txt')])
		.pipe(convertToJson())
		.pipe($.jsbeautifier())
		.pipe($.debug())
		.pipe(gulp.dest(conf.paths.bookOutput));
});

