export function runBlock($log, $state) {
	'ngInject';
	$log.debug('runBlock end');

	$state.defaultErrorHandler((rejection) => {
		$state.go('main.error', {errorData: rejection.detail}, {location: false});
	});
}
