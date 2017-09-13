describe('configuration constant',() => {
	beforeEach(angular.mock.module('ipsum'));

	it('should be registered', inject((configuration) => {
		expect(configuration).toEqual(jasmine.anything());
	}));

	it('should have a value', inject((configuration) => {
		expect(configuration.foo).toEqual('bar');
	}));
});
