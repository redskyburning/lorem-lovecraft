export class PassageController {
  constructor($log, $state, $stateParams, book, seed, excerptService) {
    'ngInject';

    this.$log           = $log;
    this.$state         = $state;
    this.book           = book;
    this.excerptService = excerptService;

    this.excerpt  = this.excerptService.getExcerptFromBook(book, Number($stateParams.paragraphCount), (seed / 1000));
    this.copyText = this.excerptService.getCopyTextFromExcerpt(this.excerpt,true);
  }
}
