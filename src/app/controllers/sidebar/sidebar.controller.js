export class SidebarController {
  constructor ($log,bookService) {
    'ngInject';

    this.$log = $log;
    this.bookService = bookService;

    this.manifest = [];

    this.bookService.getManifest()
      .then((manifest) => {
        this.manifest = manifest;
      })
      .catch((error) => {
        this.$log.error(error);
      })
  }
}
