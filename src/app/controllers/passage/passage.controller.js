export class PassageController {
  constructor($log, $state, $stateParams, book, seed) {
    'ngInject';

    this.$log   = $log;
    this.$state = $state;
    this.book   = book;
    this.seed   = seed;

    this.passage = this.book.getParagraphSequence(Number($stateParams.paragraphCount), this.seed);
  }
}
