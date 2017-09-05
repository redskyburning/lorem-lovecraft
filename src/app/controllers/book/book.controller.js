export class BookController {
  constructor($log, $state, $stateParams, book, manifest) {
    'ngInject';

    this.$log     = $log;
    this.$state = $state;
    this.manifest = manifest;
    this.book     = book;
    this.seed     = $stateParams.seed || null;

    this.selectedBookKey = $stateParams.key;
    this.passage         = this.book.getRandomParagraphSequence(5, this.seed);
  }

  changeBook() {
    this.$state.go('main.book',{ key : this.selectedBookKey });
  }

  randomizeSeed() {
    this.$state.go('main.book',{ seed : this.book.getRandomIndex() });
  }
}
