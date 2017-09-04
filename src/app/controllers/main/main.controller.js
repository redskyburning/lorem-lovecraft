export class MainController {
	constructor($log, bookService) {
		'ngInject';

		this.$log        = $log;
		this.bookService = bookService;

		this.bookService.getRandomBook()
			.then((manifest) => {
				this.$log.warn('manifest', manifest);
			})
			.catch((error) => {
				this.$log.error(error);
			});
	}
}
