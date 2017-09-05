export class BookService {
  constructor($log, $http, $q, BookModel, knuthShuffle) {
    'ngInject';

    this.$log         = $log;
    this.$http        = $http;
    this.$q           = $q;
    this.BookModel    = BookModel;
    this.knuthShuffle = knuthShuffle;

    this.basePath        = '/books';
    this.manifestPromise = null;
  }

  getManifest() {
    if (this.manifestPromise !== null) {
      return this.manifestPromise;
    }

    return this.manifestPromise = this.$q((resolve, reject) => {
      this.$http.get(`${this.basePath}/manifest.json`)
          .then((response) => {
            if (response && angular.isArray(response.data)) {
              if (response.data.length > 0) {
                let manifest = {};

                response.data.forEach((bookData) => {
                  if (bookData.key && bookData.path) {
                    manifest[bookData.key] = {
                      path : bookData.path || null,
                      title: bookData.title || null,
                      key  : bookData.key || null
                    };
                  } else {
                    this.$log.warn('Incomplete meta in manifest', bookData);
                  }
                });

                resolve(manifest);
              } else {
                reject('Empty manifest in getManifest()');
              }
            } else {
              let message = 'Malformed response in getManifest()';
              this.$log.error(message, response);
              reject(message);
            }
            resolve(response)
          })
          .catch((error) => {
            reject(error);
          });
    });
  }

  getBookByKey(key) {
    return this.$q((resolve, reject) => {
      this.getManifest()
          .then((manifest) => {
            if (manifest[key]) {
              if(manifest[key].path){
                this.getBookByFilename(manifest[key].path)
                  .then((book) => {
                    resolve(book);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              } else {
                reject(`No path found for book with key '${key}'`);
              }
            } else {
              reject(`Book with key '${key}' not found.`);
            }
          })
    });
  }

  getBookByFilename(filename) {
    return this.$q((resolve, reject) => {
      this.$http.get(`${this.basePath}/${filename}`)
          .then((response) => {
            if (response && response.data) {
              let book = new this.BookModel(response.data);
              resolve(book);
            } else {
              let message = `Malformed response in getTextByFilename('${filename}')`;
              this.$log.error(message);
              reject(message);
            }
            resolve(response)
          })
          .catch((error) => {
            reject(error);
          });
    });
  }

  getRandomBook() {
    return this.$q((resolve, reject) => {
      this.getManifest()
          .then((manifest) => {
            let keys      = Object.keys(manifest);
            let randomKey = keys[Math.floor(Math.random() * keys.length)];
            this.getBookByFilename(manifest[randomKey].path)
                .then((book) => {
                  resolve(book);
                })
                .catch((error) => {
                  reject(error);
                });
          })
          .catch((error) => {
            reject(error);
          });
    });
  }

  getWordpoolFromBook(book) {
    let paragraphs = book.getRandomParagraphSequence(10);
    let words      = [];

    paragraphs.forEach((sentences) => {
      sentences.forEach((sentence) => {
        sentence    = sentence.replace(/^"*(.+)[.,?!;]"*$/, '$1') // Trim quotes and punctuation
                              .split(/[.,?!;]*\s/); // Split on [punctuation +] space
        sentence[0] = this.changeFirstCase(sentence[0], false); // Decapitalize first letter.
        words       = words.concat(sentence);
      });
    });

    return words;
  }

  getIpsumFromBook(book, options = {}) {
    let defaultOptions = {
      paragraphCount: 8,
      sentencesPer  : 8,
      wordsPer      : 10,
      wordMin       : 4
    };

    options        = Object.assign({}, defaultOptions, options);
    let wordpool   = this.getWordpoolFromBook(book)
                         .filter(word => word.length >= options.wordMin);
    wordpool       = this.knuthShuffle(wordpool);
    let paragraphs = [];

    for (let pI = 0; pI < options.paragraphCount; pI++) {
      let sentances = [];

      for (let sI = 0; sI < options.sentencesPer; sI++) {
        let sentence = wordpool.splice(0, options.wordsPer).join(' ');
        sentence += this.getRandomPunctuation();
        sentence     = this.changeFirstCase(sentence, true);
        sentances.push(sentence);
      }

      paragraphs.push(sentances);
    }

    return paragraphs;
  }

  getRandomPunctuation() {
    let marks = ['.', '!', '?'];
    return marks[Math.floor(marks.length * Math.random())];
  }

  changeFirstCase(string, toUpperNotLower = true) {
    let first = toUpperNotLower ? string.charAt(0).toUpperCase() : string.charAt(0).toLowerCase();
    return first + string.slice(1);
  }
}
