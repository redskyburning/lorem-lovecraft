export class HomeController {
  constructor ($log,bookService) {
    'ngInject';

    this.$log = $log;
    this.bookService = bookService;

    this.book = null;
    this.passage = [];

    this.bookService.getRandomBook()
      .then((book) => {
        this.book = book;
        this.passage = book.getRandomParagraphSequence(5)
      })
      .catch((error) => {
        this.$log.error(error);
      })
  }
}
