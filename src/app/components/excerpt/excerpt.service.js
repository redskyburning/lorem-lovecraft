export class ExcerptService {
	constructor ($log, ExcerptModel) {
		'ngInject';

		// Things injected
		this.$log = $log;
		this.ExcerptModel = ExcerptModel;
	}

  getExcerptFromBook(book, length, seed) {
    length            = Math.min(length, book.getMaxLength());
    let startIndex    = Math.min(Math.floor(book.getMaxLength() * seed),book.getMaxStartIndexForLength(length));
    let endIndex      = startIndex + length;

    return new this.ExcerptModel(book.paragraphs.slice(startIndex, endIndex));
  }

  getRandomExcerptFromBook(book,length) {
    return this.getParagraphSequence(book, length, Math.random());
  }
}
