export class BookModel {

  constructor(paragraphs = [], key) {
    this.paragraphs = paragraphs || [];
    this.key        = key;
  }

  getParagraphSequence(length, seed) {
    let maxLength     = this.getMaxLength();
    length            = maxLength < length ? maxLength : length;
    let startIndex = this.getMaxStartIndexForLength(length) * seed;

    return this.paragraphs.slice(startIndex, startIndex + length);
  }

  getRandomParagraphSequence(length) {
    let maxLength  = this.getMaxLength();
    length         = maxLength < length ? maxLength : length;

    return this.getParagraphSequence(length, Math.random());
  }

  getMaxLength() {
    return this.paragraphs.length;
  }

  getMaxStartIndexForLength(length = 0) {
    return this.paragraphs.length - length;
  }

  getRandomIndex() {
    return Math.floor(Math.random() * this.getMaxStartIndexForLength(0));
  }
}
