const Request = require('request');
const Async = require('async');
const Remove = require('./remove');
const Title = require('../components/title');

class Fijado {
  constructor(url) {
    this.url = url;
    this.title = new Title();
  }

  /**
  * Alternative title tag
  */
  setTitleTag(tag) {
    this.title.setTag(tag);
  }

  fetch(callback) {
    Request(this.url, (error, request, body) => {
      // remove sidebar, nav, etc
      let remove = new Remove(body);
      remove.all((cleanBody) => {
        // get all elements from article
        Async.parallel({
          title: (callback) => {
            // title
            this.title.get(cleanBody, callback);
          },
        },
        (err, article) => {
          callback(article);
        });
      });
    });
  }
}

module.exports = Fijado;
