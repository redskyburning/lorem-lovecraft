export class BookModel {

  constructor(paragraphs = [], key) {
    this.paragraphs = paragraphs || [];
    this.key        = key;
  }

  getParagraphSequence(length, seed) {
    length            = Math.min(length, this.getMaxLength());
    let startIndex    = Math.min(Math.floor(this.getMaxLength() * seed),this.getMaxStartIndexForLength(length));
    let endIndex      = startIndex + length;

    return this.paragraphs.slice(startIndex, endIndex);
  }

  getRandomParagraphSequence(length) {
    length = Math.min(length, this.getMaxLength());

    return this.getParagraphSequence(length, Math.random());
  }

  getMaxLength() {
    return this.paragraphs.length;
  }

  getMaxStartIndexForLength(length = 0) {
    return this.paragraphs.length - length;
  }
}
