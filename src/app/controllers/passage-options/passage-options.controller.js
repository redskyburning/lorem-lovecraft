export class PassageOptionsController {
  constructor ($log,$stateParams,$state) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;

    this.paragraphCount = $stateParams.paragraphCount;
  }

  changeParagraphCount() {
    this.$state.go(this.$state.current.name,{ paragraphCount : this.paragraphCount });
  }
}
