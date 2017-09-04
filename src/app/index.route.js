export function routerConfig($stateProvider, $urlRouterProvider) {
	'ngInject';
	$stateProvider
		.state('main', {
			url         : '/',
			abstract    : true,
			templateUrl : 'app/controllers/main/main.html',
			controller  : 'MainController',
			controllerAs: 'main'
		})
		.state('main.random-book', {
			url         : 'random-book',
			templateUrl : 'app/controllers/random-book/random-book.html',
			controller  : 'RandomBookController',
			controllerAs: 'vm'
		})
		/* route injection target */
		.state('main.error', {
			url         : 'error',
			templateUrl : 'app/controllers/error/error.html',
			controller  : 'ErrorController',
			controllerAs: 'vm',
			params      : {
				errorData: 'Example error message'
			}
		})
		.state('main.style-guide', {
			url         : 'style-guide',
			templateUrl : 'app/controllers/style-guide/style-guide.html',
			controller  : 'StyleGuideController',
			controllerAs: 'vm'
		})
		.state('main.home', {
			url         : '',
			templateUrl : 'app/controllers/home/home.html',
			controller  : 'HomeController',
			controllerAs: 'vm'
		});

	$urlRouterProvider.otherwise('/');
}
