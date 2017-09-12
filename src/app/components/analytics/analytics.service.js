export class AnalyticsService {
	constructor ($log, $transitions, ga) {
		'ngInject';

		// Things injected
		this.$log = $log;
		this.$transitions = $transitions;
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
    this.$log.error('contact');
    this.ga('send', 'pageview');
  }
}
