export class MainController {
  constructor($log, $rootScope, $transitions, sidebarStateService) {
    'ngInject';

    this.$log                = $log;
    this.$rootScope          = $rootScope;
    this.sidebarStateService = sidebarStateService;

    this.isSidebarOpen = false;
    this.showToggle    = false;

    this.sidebarListener = $rootScope.$on(this.sidebarStateService.changeEventName, (event, isOpen) => {
      this.isSidebarOpen = isOpen;
    });

    $transitions.onSuccess({},(transition) => {
      this.showToggle = transition.to().name.includes('main.book');
    });
  }

  toggleSidebar() {
    this.sidebarStateService.toggleSidebar();
  }
}
