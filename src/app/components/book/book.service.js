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
                let manifest = [];

                response.data.forEach((bookData) => {
                  manifest.push({
                    path: bookData.path || null
                  });
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
            let randomIndex = Math.floor(Math.random() * manifest.length);
            this.getBookByFilename(manifest[randomIndex].path)
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
        sentence[0] = sentence[0].toLowerCase(); // Decapitalize first letter.
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
}
