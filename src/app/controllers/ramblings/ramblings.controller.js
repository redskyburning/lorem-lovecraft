export class RamblingsController {
  constructor($log, $state, book, seed, ramblingsParams, bookService, excerptService) {
    'ngInject';

    this.$log           = $log;
    this.$state         = $state;
    this.book           = book;
    this.bookService    = bookService;
    this.excerptService = excerptService;

    this.options      = ramblingsParams;
    this.options.seed = seed / 1000;

    this.excerpt      = this.excerptService.getIpsumExcerptFromBook(book, this.options);
    this.copyText     = this.excerptService.getCopyTextFromExcerpt(this.excerpt, false);
    this.htmlCopyText = this.excerptService.getCopyTextFromExcerpt(this.excerpt, true);
  }
}
