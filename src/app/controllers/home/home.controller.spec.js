describe('controllers', () => {
	let vm;

	beforeEach(angular.mock.module('ipsum'));

	beforeEach(inject(($controller) => {
		vm = $controller('HomeController');
	}));

	it('Foo should default to bar', () => {
		expect(vm.foo).toEqual('bar');
	});
});
