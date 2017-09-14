describe('service sidebarStateService', () => {
	beforeEach(angular.mock.module('ipsum'));

	it('should be registered', inject(sidebarStateService => {
		expect(sidebarStateService).toEqual(jasmine.anything());
	}));

	describe('foo variable', () => {
		it('should exist', inject(sidebarStateService => {
			expect(sidebarStateService.foo).toEqual(jasmine.anything());
		}));

		it('should default to "bar"', inject(sidebarStateService => {
			expect(sidebarStateService.foo).toEqual('bar');
		}));
	});

	describe('getters and setters', () => {
		it('should get the default value', inject((sidebarStateService) => {
			expect(sidebarStateService.getFoo()).toEqual('bar');
		}));

		it('should be able to set the value of foo', inject((sidebarStateService) => {
			expect(sidebarStateService.setFoo('fiz')).toEqual('fiz');
			expect(sidebarStateService.getFoo()).toEqual('fiz');
		}));
	});
});
