export class RamblingsOptionsController {
  constructor($log, $state, ramblingsParams) {
    'ngInject';

    this.$log   = $log;
    this.$state = $state;

    this.options = ramblingsParams;
  }

  handleChange() {
    this.$state.go(this.$state.current.name,{
      pc : this.options.paragraphCount,
      spp : this.options.sentencesPerParagraph,
      wpl : this.options.wordsPerLine,
      mwl : this.options.minWordLength
    });
  }
}
