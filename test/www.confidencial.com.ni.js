const assert = require('chai').assert;
const Feed = require('feed-read');
const Async = require('async');
const Fijado = require('../lib/fijado');
const timeOut = 90000;

describe('www.confidencial.com.ni', function () {
  describe('Title', function () {
    this.timeout(timeOut);
    var article = '';

    before((done) => {
      Feed('http://confidencial.com.ni/feed/', (err, articles) => {
        let fijado = new Fijado(articles[0].link);

        // result
        fijado.fetch((item) => {
          article = item;
          console.log(`    ► ${article.title}`);
          done();
        });
      });
    });

    it('Is string', function (done) {
      assert.typeOf(article.title, 'string');
      done();
    });

    it('Not is empty', function (done) {
      assert.operator(article.title.length, '>', 0, 'El título está vacío');
      done();
    });
  });
});
