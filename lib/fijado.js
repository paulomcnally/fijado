const Request = require('request');
const Async = require('async');
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
      Async.parallel({
        title: (callback) => {
          // title
          this.title.get(body, callback);
        },
      },
      (err, article) => {
        callback(article);
      });
    });
  }
}

module.exports = Fijado;
