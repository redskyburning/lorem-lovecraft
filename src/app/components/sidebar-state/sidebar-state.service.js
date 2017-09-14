export class SidebarStateService {
  constructor($log,$rootScope) {
    'ngInject';

    // Things injected
    this.$log = $log;
    this.$rootScope = $rootScope;

    this.changeEventName = 'sidebar-change';
    this.isOpen = false;
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.$rootScope.$broadcast(this.changeEventName,this.isOpen);
  }

  closeSidebar() {
    this.isOpen = false;
    this.$rootScope.$broadcast(this.changeEventName,this.isOpen);
  }
}
