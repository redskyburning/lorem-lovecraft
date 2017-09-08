export class HomeController {
  constructor ($log,book, excerptService) {
    'ngInject';

    this.$log = $log;

    this.randomSeed = Math.floor(Math.random() * 1000);

    this.excerpt = excerptService.getRandomExcerptFromBook(book,5);
  }
}
