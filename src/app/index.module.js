/* global moment:false knuthShuffle:false ga:false */

import {config} from './index.config';
import {routerConfig} from './index.route';
import {runBlock} from './index.run';
import {MainController} from './controllers/main/main.controller';
import {HomeController} from './controllers/home/home.controller';
import {configurationConstant} from './components/configuration/configuration.constant';
/* constant import injection target */
import {BookModel} from './components/book/book.model';
import {ExcerptModel} from './components/excerpt/excerpt.model';
/* model import injection target */
import {StyleGuideController} from './controllers/style-guide/style-guide.controller';
import {StyleGuideModalController} from './controllers/style-guide-modal/style-guide-modal.controller';
import {ErrorController} from './controllers/error/error.controller';
import {BookController} from './controllers/book/book.controller';
import {PassageController} from './controllers/passage/passage.controller';
import {RamblingsController} from './controllers/ramblings/ramblings.controller';
import {PassageOptionsController} from './controllers/passage-options/passage-options.controller';
import {RamblingsOptionsController} from './controllers/ramblings-options/ramblings-options.controller';
/* controller import injection target */
import {BookService} from './components/book/book.service';
import {ExcerptService} from './components/excerpt/excerpt.service';
import {AnalyticsService} from './components/analytics/analytics.service';
import {ConfigurationService} from './components/configuration/configuration.service';
import {SidebarStateService} from './components/sidebar-state/sidebar-state.service';
/* service import injection target */
/* factory import injection target */
/* provider import injection target */
/* directive import injection target */
import {RenderExcerptComponent} from './components/render-excerpt/render-excerpt.component';
/* component import injection target */
/* filter import injection target */
/* module import injection target */

angular.module('ipsum', ['ngAnimate', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap', 'ngclipboard'/* module injection target */])
	.constant('moment', moment)
	.constant('knuthShuffle', knuthShuffle)
	.config(config)
	.config(routerConfig)
	.run(runBlock)
	.constant('ga', ga)
	.constant('configuration', configurationConstant)
	/* constant injection target */
	.constant('BookModel', BookModel)
	.constant('ExcerptModel', ExcerptModel)
	/* model injection target */
	.service('bookService', BookService)
	.service('excerptService', ExcerptService)
	.service('analyticsService', AnalyticsService)
	.service('configurationService', ConfigurationService)
	.service('sidebarStateService', SidebarStateService)
	/* service injection target */
	/* factory injection target */
	/* provider injection target */
	/* directive injection target */
	.component('renderExcerpt', RenderExcerptComponent)
	/* component injection target */
	/* filter injection target */
	.controller('HomeController', HomeController)
	.controller('StyleGuideController', StyleGuideController)
	.controller('StyleGuideModalController', StyleGuideModalController)
	.controller('ErrorController', ErrorController)
	.controller('BookController', BookController)
	.controller('PassageController', PassageController)
	.controller('RamblingsController', RamblingsController)
	.controller('PassageOptionsController', PassageOptionsController)
	.controller('RamblingsOptionsController', RamblingsOptionsController)
	/* controller injection target */
	.controller('MainController', MainController);
