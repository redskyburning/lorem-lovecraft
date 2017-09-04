export class BookService {
	constructor($log, $http, $q, BookModel) {
		'ngInject';

		this.$log      = $log;
		this.$http     = $http;
		this.$q        = $q;
		this.BookModel = BookModel;

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
									path : bookData.path || null
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
}
