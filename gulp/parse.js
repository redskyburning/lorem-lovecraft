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
			if(!error) {
				epub.getChapter(epub.flow[0].id,(error,chapterText) => {
					$.util.log(chapterText);
				});

				/*epub.flow.forEach((chapter,i) => {
					if(i === 0){
						epub.getChapter(chapter.id,(error,chapterText) => {
							if(!error) {
								$.util.log(chapterText);
								//callback(null,file);
							} else {
								//callback(error);
							}
						});
					} else {
						callback(null,file);
					}
				});



				callback(null,file);*/
			} else {
				callback(error);
			}
		});

		epub.parse();
	});
}

gulp.task('parse', [], function() {
	return gulp.src([path.join(conf.paths.bookSrc, '/**/*.epub')])
		.pipe(convertEpubToJson())
		.pipe($.debug())
		.pipe(gulp.dest(conf.paths.bookOutput));
});

