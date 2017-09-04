export class RandomBookController {
	constructor($log, $q, bookService) {
		'ngInject';

		this.$log        = $log;
		this.$q          = $q;
		this.bookService = bookService;

		this.book       = null;
		this.paragraphs = [];

		this.randomize()
			.catch((error) => {
				this.$log.error(error);
			});
	}

	randomize() {
		return this.$q((resolve,reject) => {
			this.bookService.getRandomBook()
				.then((book) => {
					this.book       = book;
					this.paragraphs = this.book.getRandomParagraphSequence(5);
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
}
