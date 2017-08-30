export class StyleGuideModalController {
	constructor($log, $uibModalInstance) {
		'ngInject';

		this.$log = $log;
		this.$uibModalInstance = $uibModalInstance;

		this.foo = 'bar';


	}

	close() {
		this.$uibModalInstance.close();
	}
}
