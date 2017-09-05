export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url     : '/',
      abstract: true,
      views   : {
        ''            : {
          templateUrl : 'app/controllers/main/main.html',
          controller  : 'MainController',
          controllerAs: 'main'
        },
        'sidebar@main': {
          templateUrl : 'app/controllers/sidebar/sidebar.html',
          controller  : 'SidebarController',
          controllerAs: 'vm'
        }
      }
    })
    .state('main.random-book', {
      url         : 'random-book',
      templateUrl : 'app/controllers/random-book/random-book.html',
      controller  : 'RandomBookController',
      controllerAs: 'vm'
    })
    .state('main.random-words', {
      url         : 'random-words',
      templateUrl : 'app/controllers/random-words/random-words.html',
      controller  : 'RandomWordsController',
      controllerAs: 'vm'
    })
    .state('main.book', {
      url         : 'book/:key/:seed',
      templateUrl : 'app/controllers/book/book.html',
      controller  : 'BookController',
      controllerAs: 'vm',
      params: {
        seed : '1'
      },
      resolve     : {
        manifest : (bookService) => {
          return bookService.getManifest();
        },
        book: ($stateParams,bookService) => {
          return bookService.getBookByKey($stateParams.key);
        }
      }
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
