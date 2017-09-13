export class AnalyticsService {
	constructor ($log, $transitions, $state, ga, configurationService) {
		'ngInject';

		// Things injected
		this.$log = $log;
		this.$transitions = $transitions;
		this.$state = $state;
		this.ga = ga;

		this.gaId = configurationService.getGaId();

		this.init();
	}

	init() {
    this.ga('create', this.gaId, 'auto');

    this.$transitions.onSuccess({},() => {
      this.trackPageView();
    });
  }

  trackPageView() {
    this.ga('set', 'page', this.$state.href(this.$state.current));
    this.ga('send', 'pageview');
  }
}
