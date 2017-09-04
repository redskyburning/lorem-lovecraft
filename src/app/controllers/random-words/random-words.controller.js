export class RandomWordsController {
	constructor($log, bookService) {
		'ngInject';

		this.$log         = $log;
		this.bookService  = bookService;

		this.paragraphs = [];

		this.randomize();
	}

	randomize() {
		this.bookService.getRandomBook()
			.then((book) => {
				this.paragraphs = this.bookService.getIpsumFromBook(book);
				this.$log.warn('paragraphs',this.paragraphs);
			})
			.catch((error) => {
				this.$log.error(error);
			});
	}
}
