export class StyleGuideController {
	constructor($log, $uibModal) {
		'ngInject';

		this.$log = $log;
		this.$uibModal = $uibModal;

		this.buttonTypes = ['default', 'primary', 'success', 'info', 'warning', 'danger', 'link'];

		this.panelTypes = ['default', 'primary', 'success', 'info', 'warning', 'danger'];

		this.buttonSizes = [
			{
				name: 'Regular',
				code: ''
			},
			{
				name: 'Large',
				code: '-lg'
			},
			{
				name: 'Small',
				code: '-sm'
			},
			{
				name: 'Active',
				code: ' active'
			},
			{
				name: 'Disabled',
				code: ' disabled'
			},
			{
				name: 'Focused',
				code: ' focus'
			}
		];

		this.icons = ['asterisk', 'plus', 'euro', 'eur', 'minus', 'cloud', 'envelope', 'pencil', 'glass', 'music', 'search', 'heart', 'star', 'star-empty', 'user', 'film', 'th-large', 'th', 'th-list', 'ok', 'remove', 'zoom-in', 'zoom-out', 'off', 'signal', 'cog', 'trash', 'home', 'file', 'time', 'road', 'download-alt', 'download', 'upload', 'inbox', 'play-circle', 'repeat', 'refresh', 'list-alt', 'lock', 'flag', 'headphones', 'volume-off', 'volume-down', 'volume-up', 'qrcode', 'barcode', 'tag', 'tags', 'book', 'bookmark', 'print', 'camera', 'font', 'bold', 'italic', 'text-height', 'text-width', 'align-left', 'align-center', 'align-right', 'align-justify', 'list', 'indent-left', 'indent-right', 'facetime-video', 'picture', 'map-marker', 'adjust', 'tint', 'edit', 'share', 'check', 'move', 'step-backward', 'fast-backward', 'backward', 'play', 'pause', 'stop', 'forward', 'fast-forward', 'step-forward', 'eject', 'chevron-left', 'chevron-right', 'plus-sign', 'minus-sign', 'remove-sign', 'ok-sign', 'question-sign', 'info-sign', 'screenshot', 'remove-circle', 'ok-circle', 'ban-circle', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'share-alt', 'resize-full', 'resize-small', 'exclamation-sign', 'gift', 'leaf', 'fire', 'eye-open', 'eye-close', 'warning-sign', 'plane', 'calendar', 'random', 'comment', 'magnet', 'chevron-up', 'chevron-down', 'retweet', 'shopping-cart', 'folder-close', 'folder-open', 'resize-vertical', 'resize-horizontal', 'hdd', 'bullhorn', 'bell', 'certificate', 'thumbs-up', 'thumbs-down', 'hand-right', 'hand-left', 'hand-up', 'hand-down', 'circle-arrow-right', 'circle-arrow-left', 'circle-arrow-up', 'circle-arrow-down', 'globe', 'wrench', 'tasks', 'filter', 'briefcase', 'fullscreen', 'dashboard', 'paperclip', 'heart-empty', 'link', 'phone', 'pushpin', 'usd', 'gbp', 'sort', 'sort-by-alphabet', 'sort-by-alphabet-alt', 'sort-by-order', 'sort-by-order-alt', 'sort-by-attributes', 'sort-by-attributes-alt', 'unchecked', 'expand', 'collapse-down', 'collapse-up', 'log-in', 'flash', 'log-out', 'new-window', 'record', 'save', 'open', 'saved', 'import', 'export', 'send', 'floppy-disk', 'floppy-saved', 'floppy-remove', 'floppy-save', 'floppy-open', 'credit-card', 'transfer', 'cutlery', 'header', 'compressed', 'earphone', 'phone-alt', 'tower', 'stats', 'sd-video', 'hd-video', 'subtitles', 'sound-stereo', 'sound-dolby', 'sound-5-1', 'sound-6-1', 'sound-7-1', 'copyright-mark', 'registration-mark', 'cloud-download', 'cloud-upload', 'tree-conifer', 'tree-deciduous', 'yen', 'jpy', 'ruble', 'rub'];

		this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

		this.typeaheadSelection = null;

		this.colors = {
			'green'       : 'Green',
			'blue'        : 'Blue',
			'blue-light'  : 'Light Blue',
			'red'         : 'Red',
			'orange'      : 'Orange',
			'black'       : 'Black',
			'gray-lighter': 'Lighter Gray',
			'gray-light'  : 'Light Gray',
			'gray'        : 'Gray',
			'gray-dark'   : 'Dark Gray',
			'gray-darker' : 'Darker Gray'
		};

		this.semanticColors = {
			'brand-primary': 'Primary',
			'brand-success': 'Success',
			'brand-info'   : 'Info',
			'brand-warning': 'Warning',
			'brand-danger' : 'Danger'
		};

		this.slides = [
			{
				id     : 1,
				url    : '//unsplash.it/900/300',
				caption: 'This is the caption'
			},
			{
				id     : 2,
				url    : '//unsplash.it/901/300',
				caption: 'This is the caption'
			},
			{
				id     : 3,
				url    : '//unsplash.it/902/300',
				caption: 'This is the caption'
			}
		];

		this.radios = {
			left  : 'Left',
			middle: 'Middle',
			right : 'Right'
		};

		this.radioModel = 'left';

		this.alerts = [
			{
				type   : 'success',
				message: 'This is a success alert'
			},
			{
				type   : 'info',
				message: 'This is an info alert'
			},
			{
				type   : 'warning',
				message: 'This is a warning alert'
			},
			{
				type   : 'danger',
				message: 'This is a danger alert'
			}
		];

		this.currentPage = 4;
	}

	closeAlert(index) {
		this.alerts.splice(index, 1);
	}

	// ng-class can display odd behaviour when interpolating strings in the view, it's beest to do it here in the controller.
	getAlertClass(type) {
		return `alert-${type}`;
	}

	openModal(size) {
		this.$uibModal.open({
			animation : true,
			templateUrl : 'app/controllers/style-guide-modal/style-guide-modal.html',
			controller: 'StyleGuideModalController',
			controllerAs: 'vm',
			size : size
		});
	}
}
