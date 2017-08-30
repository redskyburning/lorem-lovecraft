export class ErrorController {
	constructor($log, $stateParams) {
		'ngInject';

		this.$log = $log;

		this.error = $stateParams.errorData;
	}
}
