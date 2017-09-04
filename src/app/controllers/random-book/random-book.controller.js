export class RandomBookController {
	constructor($log, bookService) {
		'ngInject';

		this.$log        = $log;
		this.bookService = bookService;
		this.book = null;
		this.paragraphs = [];

		this.bookService.getRandomBook()
			.then((book) => {
				this.book = book;
				this.paragraphs = this.book.getRandomParagraphSequence(8);
			})
			.catch((error) => {
				this.$log.error(error);
			});
	}
}
