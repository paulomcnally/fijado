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

    this.ads($);
    this.breadcrumbs($);
    this.header($);
    this.footer($);
    this.sidebar($);
    this.share($);

    callback($.html());
  }

  /**
   * Remove adsense
   */
  ads($$) {
    $$('[class*="adv_cat"]').remove();
    $$('[alt*="ads-"]').remove();
    $$('[alt*="ad-"]').remove();
    $$('[role*="banner"]').remove();
    $$('[class*="banner"]').remove();
    $$('[class*="adsbygoogle"]').remove();
    Debug(`body without ads length: ${$$.html().length}`);
  }

  /**
   * Remove header
   */
  header($$) {
    $$('head').remove();
    $$('[class*="intro-header"]').remove();
    $$('[class*="nav"]').remove();
    $$('[class*="menu"]').remove();
    $$('[class*="encabezado"]').remove();
    Debug(`body without header length: ${$$.html().length}`);
  }

  /**
   * Remove breadcrumbs
   */
  breadcrumbs($$) {
    $$('[class*="breadcrumbs"]').remove();
    $$('[id*="breadcrumbs"]').remove();
    Debug(`body without breadcrumbs length: ${$$.html().length}`);
  }

  /**
   * Remove footer
   */
  footer($$) {
    $$('script').remove();
    $$('footer').remove();
    $$('div[class*="comment"]').remove();
    $$('div[class*="intumb"]').remove();
    $$('div[class*="rel_int"]').remove();
    $$('div[class*="otherv"]').remove();
    Debug(`body without footer length: ${$$.html().length}`);
  }

  /**
   * Remove share and likes
   */
  share($$) {
    $$('.fb-like').remove();
    $$('div[class*="social"]').remove();
    $$('div[class*="share"]').remove();
    $$('[class*="print"]').remove();
    $$('[class*="skip"]').remove();
    Debug(`body without likes and shares length: ${$$.html().length}`);
  }

  /**
   * Remove sidebar
   */
  sidebar($$) {
    $$('aside').remove();
    $$('div.sidebar').remove();
    $$('div.colder').remove();
    Debug(`body without sidebar length: ${$$.html().length}`);
  }

}

module.exports = Remove;
