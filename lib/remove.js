const Debug = require('debug')('fijado:remove');
const jsdom = require('jsdom');
const cheerio = require('cheerio');

class Remove {
  constructor(body) {
    this.body = body;
  }

  all(callback) {
    let $ = cheerio.load(this.body);

    Debug(`Body all length: ${$.html().length}`);

    this.sidebar($);

    callback($.html());
  }

  /**
   * Remove sidebar
   */
  sidebar($$) {
    $$('div.sidebar').remove();
    Debug(`body without sidebar length: ${$$.html().length}`);
  }
}

module.exports = Remove;
