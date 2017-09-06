export class BookModel {

  constructor(paragraphs = [], key) {
    this.paragraphs = paragraphs || [];
    this.key        = key;
  }

  getParagraphSequence(length, startIndex = 0) {
    let maxLength     = this.getMaxLength();
    length            = maxLength < length ? maxLength : length;
    let maxStartIndex = this.getMaxStartIndexForLength(length);
    startIndex        = startIndex > maxStartIndex ? maxStartIndex : Number(startIndex);

    return this.paragraphs.slice(startIndex, startIndex + length);
  }

  getRandomParagraphSequence(length) {
    let maxLength  = this.getMaxLength();
    length         = maxLength < length ? maxLength : length;
    let maxIndex   = this.getMaxStartIndexForLength(length);
    let startIndex = Math.floor(maxIndex * Math.random());

    return this.getParagraphSequence(length, startIndex);
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
