const Debug = require('debug')('fijado:content');
const jsdom = require('jsdom');
const himalaya = require('himalaya');
const md = require('html-md');
const Utiles = require('../lib/utiles');
const Markdown = require('../lib/markdown');
let utiles = new Utiles();

class Content {
  constructor() {
    this.title = '';
    this.elements = [];
    this.tags = [
      'a',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'iframe',
      'img',
      'li',
      'p',
      'span',
      'strong',
      'ul',
    ];
  }

  /**
   * Custom tag
   */
  setTag() {

  }

  cleanContent(value) {
    var newValue = value.replace(/(\r\n|\n\t|\n|\r|\t|  )/gm, '');
    if (newValue !== '') {
      newValue = newValue.trim();
    }

    return newValue;
  }

  parseElement(items) {
    if (items) {
      items.forEach((item) => {
        var objectItem = {
          content: '',
          type: '',
        };

        if (item.type === 'Text') {
          objectItem.content = this.cleanContent(item.content);
          objectItem.type = 'text';
        }

        if (item.hasOwnProperty('tagName') && this.tags.indexOf(item.tagName) !== -1) {
          console.log('Llegue hasta aquí');
          console.log(item.tagName);
          objectItem.tagName = item.tagName;

          if (item.hasOwnProperty('attributes')) {
            if (item.attributes.hasOwnProperty('className')) {
              item.attributes.className.forEach((className) => {
                objectItem.classNames = [];
                objectItem.classNames.push(className);
              });
            }
          }

          switch (this.tags) {
            case 'img':
              console.log('llegue image');
              objectItem.content = this.cleanContent(item.src);
              objectItem.type = 'image';
            break;
          }
        }

        this.elements.push(objectItem);

        if (item.hasOwnProperty('children')) {
          return this.parseElement(item.children);
        }

      });
    }
  }

  cleanElements() {
    let i = 0;
    this.elements.forEach((element) => {
      if (element.content === '') {
        delete this.elements[i];
      }

      i++;
    });
  }

  removeNull(e) {
    return e;
  }

  /**
   * Replace youtube iframe with youtube tag
   */
  youtubeInject(body) {
    let youtubeIds = [];
    let videos = body.match(/<iframe.*?src=".*?youtube\.com\/embed\/(\w+)/);
    if (videos !== null) {
      // validate
      videos.forEach((videoId) => {
        Debug(`Youtube ID: ${videoId}`);
        if (/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
          youtubeIds.push(videoId);
        }
      });

      // inject video tag
      youtubeIds.forEach((youtubeId) => {
        let youtubeTag = `<p>youtube${youtubeId}youtube</p>`;
        var regExp = RegExp(`<iframe.*?src=".*?youtube\.com\/embed\/(${youtubeId}).+`);
        body = body.replace(regExp, youtubeTag);
      });
    }

    return body;
  }

  /**
   * Use all methods to get a title
   */
  get(body, callback) {
    jsdom.env(body, ['http://code.jquery.com/jquery.js'], (err, window) => {
      // Inject youtube videos
      body = this.youtubeInject(body);

      // instance markdown
      let markdown = new Markdown(md(body, {
        inline: true,
      }));

      // parse markdown
      markdown.parse(callback);
    });
  }
}

module.exports = Content;
