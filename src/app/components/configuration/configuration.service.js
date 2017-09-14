export class ConfigurationService {
  constructor($log, configuration) {
    'ngInject';

    this.$log          = $log;
    this.configuration = configuration;
  }

  getGaId() {
    return this.configuration.gaId || null;
  }
}
