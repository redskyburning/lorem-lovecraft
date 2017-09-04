describe('book model',() => {
	beforeEach(angular.mock.module('ipsum'));

	it('should be registered', inject((BookModel) => {
		expect(BookModel).toEqual(jasmine.anything());
	}));

	it('can be used to new up an instance with default values', inject((BookModel) => {
		let instance = new BookModel();
		expect(instance.foo).toEqual('bar');
	}));
});
