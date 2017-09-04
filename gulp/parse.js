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
  // See https://stackoverflow.com/questions/267399/how-do-you-match-only-valid-roman-numerals-with-a-regular-expression. Excluded zero, added optional period.
  const romanRegex  = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{1,3})\.+$/;

  function transformFunction(file, encoding, callback) {
    const targetString = '***target***';
    let textArray      = [];

    String(file.contents)
    // Break into paragraphs by looking for 2+ newlines
      .split(/[\n]{2,}/)
      .forEach((paragraph) => {
        let paragraphArray = [];

        // Break into sentences by looking for the spaces at the end of sentences.
        // Looking for a lowercase character before a period separates the end of sentences and the end of abbreviations with periods.
        paragraph.replace(/([a-z]\.)\s/g, `$1${targetString}`)
                 .split(targetString)
                 .forEach((sentence) => {
                   // Add the sentence only if it's a valid string with word-y letters (excludes decorative stuff like * * *) and isn't just roman numerals (excludes roman numeral chapter headings).
                   if (typeof sentence === 'string' && sentence.search(/\w/) > -1 && sentence.search(romanRegex) === -1) {
                     paragraphArray.push(sentence);
                   }
                 });

        // It's possible we've filtered out all the sentences. Don't push empty paragraphs.
        if (paragraphArray.length > 0) {
          textArray.push(paragraphArray);
        }
      });

    file.contents = new Buffer(JSON.stringify(textArray));

    let frontMatter = file.frontMatter || {};

    // Change to json ext and normalize name
    let pathObj  = path.parse(file.path);
    pathObj.base = changeCase.paramCase(pathObj.name) + '.json';
    file.path    = path.format(pathObj);

    // Push info to manifest and save ref file for later if needed
    if (referenceFile === null) {
      referenceFile = file.clone();
    }
    let key = path.basename(file.path, path.extname(file.path));

    manifest.push({
      path  : path.basename(file.path),
      key   : key,
      title : frontMatter.title || key,
      year  : frontMatter.year || null,
      source: frontMatter.source || null,
      author: frontMatter.author || null
    });

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
             .pipe($.frontMatter())
             .pipe(convertToJson())
             .pipe($.jsbeautifier())
             .pipe($.debug())
             .pipe(gulp.dest(conf.paths.bookOutput));
});

