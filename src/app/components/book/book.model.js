export class BookModel {

	constructor(paragraphs = []) {
		this.paragraphs = paragraphs || [];
	}

	getParagraphSequence(length, startIndex = 0) {
		let maxLength     = this.getMaxLength();
		length            = maxLength < length ? maxLength : length;
		let maxStartIndex = this.getMaxStartIndexForLength(length);
		startIndex        = startIndex > maxStartIndex ? maxStartIndex : startIndex;

		return this.paragraphs.slice(startIndex, startIndex + length);
	}

	getRandomParagraphSequence(length) {
		let maxLength  = this.getMaxLength();
		length         = maxLength < length ? maxLength : length;
		let startIndex = Math.floor(Math.random() * this.getMaxStartIndexForLength(length));

		return this.getParagraphSequence(length, startIndex);
	}

	getMaxLength() {
		return this.paragraphs.length;
	}

	getMaxStartIndexForLength(length) {
		return this.paragraphs.length - length;
	}
}
