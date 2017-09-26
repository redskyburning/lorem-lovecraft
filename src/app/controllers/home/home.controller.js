export class HomeController {
  constructor ($log,book, excerptService) {
    'ngInject';

    this.$log = $log;
    this.book = book;

    this.randomSeed = Math.floor(Math.random() * 1000);

    this.excerpt = excerptService.getIpsumExcerptFromBook(book,{
      seed : this.randomSeed
    });
  }
}
