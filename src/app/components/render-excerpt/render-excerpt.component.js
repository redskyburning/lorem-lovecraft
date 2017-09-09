class RenderExcerptComponentController {
  constructor($log,$element) {
    'ngInject';

    this.$log = $log;

    $element.addClass('render-excerpt');
  }
}

export const RenderExcerptComponent = {
  controller  : RenderExcerptComponentController,
  controllerAs: 'vm',
  templateUrl : 'app/components/render-excerpt/render-excerpt.html',
  bindings    : {
    excerpt: '<'
  }
};
