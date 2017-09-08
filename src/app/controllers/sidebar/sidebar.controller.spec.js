describe('controller SidebarController', () => {
	let vm;

	beforeEach(angular.mock.module('ipsum'));

	beforeEach(inject(($controller) => {
		vm = $controller('SidebarController');
	}));

	it('Foo should default to bar', () => {
		expect(vm.foo).toEqual('bar');
	});
});
