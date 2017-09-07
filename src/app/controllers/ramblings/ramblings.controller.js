export class RamblingsController {
  constructor($log, $state, book, seed, ramblingsParams, bookService) {
    'ngInject';

    this.$log        = $log;
    this.$state      = $state;
    this.book        = book;
    this.bookService = bookService;

    this.options = ramblingsParams;
    this.options.seed = seed / 1000;

    this.passage = this.bookService.getIpsumFromBook(book, this.options);
  }
}
