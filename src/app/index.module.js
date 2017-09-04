/* global moment:false */

import {config} from './index.config';
import {routerConfig} from './index.route';
import {runBlock} from './index.run';
import {MainController} from './controllers/main/main.controller';
import {HomeController} from './controllers/home/home.controller';
/* constant import injection target */
/* model import injection target */
import {StyleGuideController} from './controllers/style-guide/style-guide.controller';
import {StyleGuideModalController} from './controllers/style-guide-modal/style-guide-modal.controller';
import {ErrorController} from './controllers/error/error.controller';
/* controller import injection target */
import {BookService} from './components/book/book.service';
/* service import injection target */
/* factory import injection target */
/* provider import injection target */
/* directive import injection target */
/* component import injection target */
/* filter import injection target */
/* module import injection target */

angular.module('ipsum', ['ngAnimate', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap'/* module injection target */])
	.constant('moment', moment)
	.config(config)
	.config(routerConfig)
	.run(runBlock)
	/* constant injection target */
	/* model injection target */
	.service('bookService', BookService)
	/* service injection target */
	/* factory injection target */
	/* provider injection target */
	/* directive injection target */
	/* component injection target */
	/* filter injection target */
	.controller('HomeController', HomeController)
	.controller('StyleGuideController', StyleGuideController)
	.controller('StyleGuideModalController', StyleGuideModalController)
	.controller('ErrorController', ErrorController)
	/* controller injection target */
	.controller('MainController', MainController);
