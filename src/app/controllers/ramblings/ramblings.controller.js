export class RamblingsController {
  constructor($log, $state, $stateParams, book, bookService) {
    'ngInject';

    this.$log        = $log;
    this.$state      = $state;
    this.book        = book;
    this.bookService = bookService;
    this.seed        = $stateParams.seed || null;

    this.passage = this.bookService.getIpsumFromBook(book, {
      seed : this.seed / 1000
    });
  }
}
