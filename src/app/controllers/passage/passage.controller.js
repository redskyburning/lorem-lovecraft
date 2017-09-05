export class PassageController {
  constructor($log, $state, $stateParams, book) {
    'ngInject';

    this.$log   = $log;
    this.$state = $state;
    this.book   = book;
    this.seed   = $stateParams.seed || null;

    this.passage = this.book.getRandomParagraphSequence(5, this.seed);
  }
}
