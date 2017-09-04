describe('controller RandomWordsController', () => {
	let vm;

	beforeEach(angular.mock.module('ipsum'));

	beforeEach(inject(($controller) => {
		vm = $controller('RandomWordsController');
	}));

	it('Foo should default to bar', () => {
		expect(vm.foo).toEqual('bar');
	});
});
