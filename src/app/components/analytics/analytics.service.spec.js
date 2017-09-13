describe('service analyticsService', () => {
	beforeEach(angular.mock.module('ipsum'));

	it('should be registered', inject(analyticsService => {
		expect(analyticsService).toEqual(jasmine.anything());
	}));

	describe('foo variable', () => {
		it('should exist', inject(analyticsService => {
			expect(analyticsService.foo).toEqual(jasmine.anything());
		}));

		it('should default to "bar"', inject(analyticsService => {
			expect(analyticsService.foo).toEqual('bar');
		}));
	});

	describe('getters and setters', () => {
		it('should get the default value', inject((analyticsService) => {
			expect(analyticsService.getFoo()).toEqual('bar');
		}));

		it('should be able to set the value of foo', inject((analyticsService) => {
			expect(analyticsService.setFoo('fiz')).toEqual('fiz');
			expect(analyticsService.getFoo()).toEqual('fiz');
		}));
	});
});
