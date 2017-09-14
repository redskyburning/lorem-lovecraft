export class MainController {
  constructor($log, $rootScope, sidebarStateService) {
    'ngInject';

    this.$log                = $log;
    this.$rootScope          = $rootScope;
    this.sidebarStateService = sidebarStateService;

    this.isSidebarOpen   = false;

    this.sidebarListener = $rootScope.$on(this.sidebarStateService.changeEventName, (event,isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }

  toggleSidebar() {
    this.sidebarStateService.toggleSidebar();
  }
}
