export class HomeController {
  constructor ($log,book) {
    'ngInject';

    this.$log = $log;
    this.book = book;

    this.passage = [];
    this.randomSeed = Math.floor(Math.random() * 1000);

    this.passage = this.book.getRandomParagraphSequence(5);
  }
}
