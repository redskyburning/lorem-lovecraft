export class MainController {
  constructor($log, $rootScope, $transitions, $state, sidebarStateService) {
    'ngInject';

    this.$log                = $log;
    this.$rootScope          = $rootScope;
    this.sidebarStateService = sidebarStateService;

    this.isSidebarOpen = false;
    this.showToggle    = $state.current.name.includes('main.book');

    this.sidebarListener = $rootScope.$on(this.sidebarStateService.changeEventName, (event, isOpen) => {
      this.isSidebarOpen = isOpen;
    });

    $transitions.onFinish({},(transition) => {
      this.showToggle = transition.to().name.includes('main.book');
    });
  }

  toggleSidebar() {
    this.sidebarStateService.toggleSidebar();
  }
}
