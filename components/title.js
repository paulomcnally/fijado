const jsdom = require('jsdom');
const Utiles = require('../lib/utiles');
let utiles = new Utiles();

class Title {
  constructor() {
    this.title = '';
  }

  /**
   * h1 tag with div parent
   */
  headerOneMethod($$) {
    let header1 = $$('h1');
    $$.each(header1, (i, item) => {
      let isValid = $$(item).parent().is('div');
      if (isValid) {
        let title = $$(item).text();
        this.title = utiles.cleanText(title);
      }
    });
  }

  /**
   * Paragraph based class name contain title text
   */
  classNameMethod($$) {
    let title = '';
    if (utiles.isEmpty(this.title)) {
      let titles = $$("p[class*='title'],h1[class*='title']");
      $$.each(titles, (i, item) => {
        let isValid = $$(item).text().split(' ').length > 2;
        if (isValid) {
          title = $$(item).text();
        }
      });

      this.title = utiles.cleanText(title);
    }
  }

  /**
   * Custom tag
   */
  setTag() {

  }

  /**
   * Use all methods to get a title
   */
  get(body, callback) {
    jsdom.env(body, ['http://code.jquery.com/jquery.js'], (err, window) => {

      this.headerOneMethod(window.$);

      this.classNameMethod(window.$);

      callback(null, this.title);
    });
  }
}

module.exports = Title;
