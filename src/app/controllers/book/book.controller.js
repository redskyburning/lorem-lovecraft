export class BookController {
  constructor($log, $state, $stateParams, $rootScope, book, manifest, seed) {
    'ngInject';

    this.$log       = $log;
    this.$state     = $state;
    this.$rootScope = $rootScope;
    this.manifest   = manifest;
    this.book       = book;
    this.seed       = seed;

    this.selectedBookKey = $stateParams.key;
    this.selectedMode    = angular.copy($state.current.name);

    this.modes = [
      {
        label: 'An Obscure Passage',
        key  : 'main.book.passage'
      },
      {
        label: 'Mad Ramblings',
        key  : 'main.book.ramblings'
      }
    ];

    if (!this.seed) {
      this.randomizeSeed();
    }
  }

  changeMode(key) {
    this.$state.go(key);
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

  triggerCopy() {
    this.$rootScope.$broadcast('trigger-copy',{
      copyHtml : false
    });
  }
}
