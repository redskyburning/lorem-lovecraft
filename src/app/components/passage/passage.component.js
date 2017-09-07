class PassageComponentController {
  constructor($log,$element) {
    'ngInject';

    // TODO : Rename as excerpt
    this.$log = $log;

    $element.addClass('passage');
  }
}

export const PassageComponent = {
  controller  : PassageComponentController,
  controllerAs: 'vm',
  templateUrl : 'app/components/passage/passage.html',
  bindings    : {
    paragraphs: '<'
  }
};
