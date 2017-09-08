export class BookService {
  constructor($log, $http, $q, BookModel) {
    'ngInject';

    this.$log         = $log;
    this.$http        = $http;
    this.$q           = $q;
    this.BookModel    = BookModel;

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
              if (manifest[key].path) {
                this.getBookByFilename(manifest[key].path)
                    .then((book) => {
                      book.key = key;
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
            this.getBookByKey(randomKey)
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
}
