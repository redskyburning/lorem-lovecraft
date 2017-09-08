describe('controller BookController', () => {
	let vm;

	beforeEach(angular.mock.module('ipsum'));

	beforeEach(inject(($controller) => {
		vm = $controller('BookController');
	}));

	it('Foo should default to bar', () => {
		expect(vm.foo).toEqual('bar');
	});
});
