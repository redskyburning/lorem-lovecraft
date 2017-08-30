export function config ($logProvider, $locationProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  $locationProvider.html5Mode(true);
}
