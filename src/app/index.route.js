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
        }
      },
      resolve : {
        initAnalytics : (analyticsService) => { // eslint-disable-line
          return;
        }
      }
    })
    .state('main.book', {
      url         : 'book/:key/:seed',
      abstract    : true,
      templateUrl : 'app/controllers/book/book.html',
      controller  : 'BookController',
      controllerAs: 'vm',
      params      : {
        seed: String(Math.floor(Math.random() * 1000))
      },
      resolve     : {
        manifest: (bookService) => {
          return bookService.getManifest();
        },
        book    : ($stateParams, bookService) => {
          return bookService.getBookByKey($stateParams.key);
        },
        seed    : ($stateParams) => {
          let seed = Number($stateParams.seed);

          if (seed > 0 && seed < 1000) {
            return seed;
          } else {
            return null;
          }
        }
      }
    })
    .state('main.book.passage', {
      url         : '/:paragraphCount',
      params : {
        paragraphCount : '5'
      },
      views: {
        '@main.book'       : {
          templateUrl : 'app/controllers/passage/passage.html',
          controller  : 'PassageController',
          controllerAs: 'vm'
        },
        'options@main.book': {
          templateUrl : 'app/controllers/passage-options/passage-options.html',
          controller  : 'PassageOptionsController',
          controllerAs: 'vm'
        }
      }
    })
    .state('main.book.ramblings', {
      url  : '/ramblings?pc,spp,wpl,mwl',
      resolve : {
        ramblingsParams : ($stateParams) => {
          return {
            paragraphCount       : $stateParams.pc || 5,
            sentencesPerParagraph: $stateParams.spp || 8,
            wordsPerLine         : $stateParams.wpl || 10,
            minWordLength        : $stateParams.mwl || 4
          };
        }
      },
      views: {
        '@main.book'       : {
          templateUrl : 'app/controllers/ramblings/ramblings.html',
          controller  : 'RamblingsController',
          controllerAs: 'vm'
        },
        'options@main.book': {
          templateUrl : 'app/controllers/ramblings-options/ramblings-options.html',
          controller  : 'RamblingsOptionsController',
          controllerAs: 'vm'
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
      controllerAs: 'vm',
      resolve : {
        book : ($q,bookService) => {
          return $q((resolve,reject) => {
            bookService.getRandomBook()
                .then((book) => {
                  resolve(book);
                })
                .catch((error) => {
                  reject(error);
                });
          });
        }
      }
    });

  $urlRouterProvider.otherwise('/');
}
