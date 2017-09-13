export class ConfigurationService {
  constructor($log, configuration) {
    'ngInject';

    // Things injected
    this.$log          = $log;
    this.configuration = configuration;

    this.$log.warn('config', configuration);
  }

  getGaId() {
    return this.configuration.gaId || null;
  }
}
