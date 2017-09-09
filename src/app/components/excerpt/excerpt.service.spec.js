describe('service excerptService', () => {
	beforeEach(angular.mock.module('ipsum'));

	it('should be registered', inject(excerptService => {
		expect(excerptService).toEqual(jasmine.anything());
	}));

	describe('foo variable', () => {
		it('should exist', inject(excerptService => {
			expect(excerptService.foo).toEqual(jasmine.anything());
		}));

		it('should default to "bar"', inject(excerptService => {
			expect(excerptService.foo).toEqual('bar');
		}));
	});

	describe('getters and setters', () => {
		it('should get the default value', inject((excerptService) => {
			expect(excerptService.getFoo()).toEqual('bar');
		}));

		it('should be able to set the value of foo', inject((excerptService) => {
			expect(excerptService.setFoo('fiz')).toEqual('fiz');
			expect(excerptService.getFoo()).toEqual('fiz');
		}));
	});
});
