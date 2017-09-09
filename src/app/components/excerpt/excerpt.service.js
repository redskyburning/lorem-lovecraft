export class ExcerptService {
  constructor($log, knuthShuffle, ExcerptModel) {
    'ngInject';

    // Things injected
    this.$log         = $log;
    this.knuthShuffle = knuthShuffle;

    this.ExcerptModel = ExcerptModel;
  }

  getExcerptFromBook(book, length, seed) {
    length         = Math.min(length, book.getMaxLength());
    let startIndex = Math.min(Math.floor(book.getMaxLength() * seed), book.getMaxStartIndexForLength(length));
    let endIndex   = startIndex + length;

    return new this.ExcerptModel(book.paragraphs.slice(startIndex, endIndex));
  }

  getRandomExcerptFromBook(book, length) {
    return this.getExcerptFromBook(book, length, Math.random());
  }

  getWordpoolFromBook(book, seed) {
    let paragraphs = book.getRandomParagraphSequence(50, seed);
    let words      = [];

    paragraphs.forEach((sentences) => {
      sentences.forEach((sentence) => {
        sentence    = sentence.replace(/^"*(.+)[.,?!;]"*$/, '$1') // Trim quotes and punctuation
                              .split(/[.,?!;]*\s/); // Split on [punctuation +] space
        sentence[0] = this.changeFirstCase(sentence[0], false); // Decapitalize first letter.
        words       = words.concat(sentence);
      });
    });

    return words;
  }

  getIpsumExcerptFromBook(book, options = {}) {
    let defaultOptions = {
      paragraphCount       : 8,
      sentencesPerParagraph: 8,
      wordsPerLine         : 10,
      minWordLength        : 4,
      seed                 : Math.random()
    };

    options        = Object.assign({}, defaultOptions, options);
    let wordpool   = this.getWordpoolFromBook(book, options.seed)
                         .filter(word => word.length >= options.minWordLength);
    wordpool       = this.knuthShuffle(wordpool);
    let paragraphs = [];

    for (let pI = 0; pI < options.paragraphCount && wordpool.length >= options.wordsPerLine; pI++) {
      let sentences = [];

      for (let sI = 0; sI < options.sentencesPerParagraph && wordpool.length >= options.wordsPerLine; sI++) {
        let sentence = wordpool.splice(0, options.wordsPerLine).join(' ');
        sentence += this.getRandomPunctuation();
        sentence     = this.changeFirstCase(sentence, true);
        sentences.push(sentence);
      }

      paragraphs.push(sentences);
    }

    return new this.ExcerptModel(paragraphs);
  }

  getRandomPunctuation() {
    let marks = ['.', '!', '?'];
    return marks[Math.floor(marks.length * Math.random())];
  }

  changeFirstCase(string, toUpperNotLower = true) {
    let first = toUpperNotLower ? string.charAt(0).toUpperCase() : string.charAt(0).toLowerCase();
    return first + string.slice(1);
  }
}
