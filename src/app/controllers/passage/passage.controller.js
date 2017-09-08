export class PassageController {
  constructor($log, $state, $stateParams, book, seed, excerptService) {
    'ngInject';

    this.$log           = $log;
    this.$state         = $state;
    this.book           = book;
    this.excerptService = excerptService;

    this.passage = this.excerptService.getExcerptFromBook(Number($stateParams.paragraphCount), (seed / 1000));
  }
}
