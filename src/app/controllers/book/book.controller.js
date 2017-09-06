export class BookController {
  constructor($log, $state, $stateParams, book, manifest, seed) {
    'ngInject';

    this.$log     = $log;
    this.$state   = $state;
    this.manifest = manifest;
    this.book     = book;
    this.seed     = seed;

    this.selectedBookKey = $stateParams.key;

    if (!this.seed) {
      this.randomizeSeed();
    }
  }

  changeBook() {
    this.$state.go(this.$state.current.name, {
      key: this.selectedBookKey
    });
  }

  randomizeSeed() {
    this.$state.go(this.$state.current.name, {
      seed: Math.floor(Math.random() * 1000)
    });
  }
}
