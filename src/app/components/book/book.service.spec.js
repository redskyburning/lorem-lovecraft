describe('service bookService', () => {
	beforeEach(angular.mock.module('ipsum'));

	it('should be registered', inject(bookService => {
		expect(bookService).toEqual(jasmine.anything());
	}));

	describe('foo variable', () => {
		it('should exist', inject(bookService => {
			expect(bookService.foo).toEqual(jasmine.anything());
		}));

		it('should default to "bar"', inject(bookService => {
			expect(bookService.foo).toEqual('bar');
		}));
	});

	describe('getters and setters', () => {
		it('should get the default value', inject((bookService) => {
			expect(bookService.getFoo()).toEqual('bar');
		}));

		it('should be able to set the value of foo', inject((bookService) => {
			expect(bookService.setFoo('fiz')).toEqual('fiz');
			expect(bookService.getFoo()).toEqual('fiz');
		}));
	});
});
