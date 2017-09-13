describe('service configurationService', () => {
	beforeEach(angular.mock.module('ipsum'));

	it('should be registered', inject(configurationService => {
		expect(configurationService).toEqual(jasmine.anything());
	}));

	describe('foo variable', () => {
		it('should exist', inject(configurationService => {
			expect(configurationService.foo).toEqual(jasmine.anything());
		}));

		it('should default to "bar"', inject(configurationService => {
			expect(configurationService.foo).toEqual('bar');
		}));
	});

	describe('getters and setters', () => {
		it('should get the default value', inject((configurationService) => {
			expect(configurationService.getFoo()).toEqual('bar');
		}));

		it('should be able to set the value of foo', inject((configurationService) => {
			expect(configurationService.setFoo('fiz')).toEqual('fiz');
			expect(configurationService.getFoo()).toEqual('fiz');
		}));
	});
});
