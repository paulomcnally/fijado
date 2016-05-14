const Debug = require('debug')('fijado:title');
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
      let isValid = ($$(item).parent().is('div') || $$(item).parent().is('header'));
      if (isValid && !this.inClassNameBlackList($$, item)) {
        let title = utiles.cleanText($$(item).text());
        this.title = title;
        Debug(`Method: headerOneMethod`);
        Debug(`Title: ${title}`);
      }
    });
  }

  /**
   * Paragraph based class name contain title text
   */
  classNameMethod($$) {
    let title = '';
    if (utiles.isEmpty(this.title)) {
      var elements = $$('[class*="title"]');

      $$.each(elements, (i, item) => {
        let inClassNameBlackList = this.inClassNameBlackList($$, item);
        let inTagBlackList = this.inTagBlackList($$, item);

        if (!inClassNameBlackList && !inTagBlackList) {
          let isValid = $$(item).text().split(' ').length > 2;
          if (isValid) {
            title = utiles.cleanText($$(item).text());
            this.title = title;
            Debug(`Method: classNameMethod 1`);
            Debug(`Title: ${title}`);
          }
        };
      });

      // Example:
      // https://jsfiddle.net/Lkh6nnk3/
      if (utiles.isEmpty(this.title)) {
        $$.each(elements, (i, item) => {
          let inClassNameBlackList = this.inClassNameBlackList($$, item);
          let inTagBlackList = this.inTagBlackList($$, item);

          if (!inClassNameBlackList && !inTagBlackList) {
            let isValid = $$(item).next().text().split(' ').length > 2;
            if (isValid) {
              title = utiles.cleanText($$(item).next().text());
              this.title = title;
              Debug(`Method: classNameMethod 2`);
              Debug(`Title: ${title}`);
            }
          };
        });
      }
    }
  }

  /**
   * Ignore items with blackList class name
   */
  inClassNameBlackList($$, item) {
    let inBlackList = false;
    let classNames = $$(item).attr('class');
    var blackList = [
      'site-title',
      'reply-title',
      'comment-reply-title',
      'modal-title',
    ];

    if (classNames !== undefined) {
      $$.each(classNames.split(' '), (i, item) => {
        if (blackList.indexOf(item) !== -1) {
          inBlackList = true;
        }
      });
    }

    Debug(`inClassNameBlackList: ${inBlackList}`);

    return inBlackList;
  }

  inTagBlackList($$, item) {
    let inBlackList = false;
    let tagName = $$(item).prop('tagName');
    var blackList = [
      'A',
      'DIV',
    ];

    if (blackList.indexOf(tagName) !== -1) {
      inBlackList = true;
    }

    Debug(`inTagBlackList: ${inBlackList}`);

    return inBlackList;
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
