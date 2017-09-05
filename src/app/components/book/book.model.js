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

  getRandomParagraphSequence(length, startIndex) {
    let maxLength = this.getMaxLength();
    length        = maxLength < length ? maxLength : length;
    let maxIndex  = this.getMaxStartIndexForLength(length);
    startIndex    = startIndex && startIndex <= maxIndex ? startIndex : Math.floor(Math.random() * maxIndex);

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
