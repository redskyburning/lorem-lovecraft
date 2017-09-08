describe('controller RamblingsOptionsController', () => {
	let vm;

	beforeEach(angular.mock.module('ipsum'));

	beforeEach(inject(($controller) => {
		vm = $controller('RamblingsOptionsController');
	}));

	it('Foo should default to bar', () => {
		expect(vm.foo).toEqual('bar');
	});
});
