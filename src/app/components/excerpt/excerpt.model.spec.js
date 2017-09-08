describe('excerpt model',() => {
	beforeEach(angular.mock.module('ipsum'));

	it('should be registered', inject((ExcerptModel) => {
		expect(ExcerptModel).toEqual(jasmine.anything());
	}));

	it('can be used to new up an instance with default values', inject((ExcerptModel) => {
		let instance = new ExcerptModel();
		expect(instance.foo).toEqual('bar');
	}));
});
