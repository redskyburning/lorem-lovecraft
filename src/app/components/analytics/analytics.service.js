export class AnalyticsService {
	constructor ($log, $transitions, $state, ga) {
		'ngInject';

		// Things injected
		this.$log = $log;
		this.$transitions = $transitions;
		this.$state = $state;
		this.ga = ga;

		this.prodId = 'UA-106348066-1';
		this.testId = 'UA-106348066-2';

		this.init();
	}

	init() {
    this.ga('create', this.testId, 'auto');

    this.$transitions.onSuccess({},() => {
      this.trackPageView();
    });
  }

  trackPageView() {
    this.ga('set', 'page', this.$state.href(this.$state.current));
    this.ga('send', 'pageview');
  }
}
