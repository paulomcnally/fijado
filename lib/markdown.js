const Debug = require('debug')('fijado:markdown');
const Marked = require('marked');
const Utiles = require('./utiles');
let utiles = new Utiles();

class Markdown {
  constructor(markdown) {
    this.markdown = markdown;
    this.components = [];
  }

  parse(callback) {
    let elements = this.markdown.split(/\r?\n/);
    elements.forEach((element) => {
      this.parseElement(element);
    });

    callback(null, this.components);
  }

  parseElement(element) {
    let component = {};
    let match;

    // header
    if (/^(#{1,6})(.*)/.test(element)) {
      match = element.match(/^(#{1,6})(.*)/);

      component.type = 'header';
      component.text = utiles.cleanText(match[2]);
    }

    // image
    if (/\!\[([^\[]+)\]\(([^\)]+)\)/.test(element)) {
      match = element.match(/\!\[([^\[]+)\]\(([^\)]+)\)/);

      component.type = 'image';
      component.url = match[2];
    }

    // blockquotes
    if (/^(&gt;|\>)(.*)$/.test(element)) {
      match = element.match(/^(&gt;|\>)(.*)$/);

      component.type = 'blockquotes';
      component.text = Marked(match[2]);

      if (/\s\(@\w{1,15}\)\s.+(twitter.com\/\w{1,15}\/status\/\d{1,})/.test(component.text)) {
        let username = component.text.match(/\s\(@(\w{1,15})\)\s/)[1];
        component.source = 'twitter';
        component.username = username;
        component.avatar = `https://twitter.com/${username}/profile_image?size=bigger`;
      }
    }

    // list
    if (/^\*{1}\s(.*)$/.test(element)) {
      match = element.match(/^\*{1}\s(.*)/);

      component.type = 'list';
      component.text = Marked(match[1]);
    }

    // youtube
    if (/^youtube(.*)youtube$/.test(element)) {
      match = element.match(/^youtube(.*)youtube$/);
      let toReplace = match[1].replace(/[A-Za-z0-9_-]/gi, '');

      component.type = 'video';
      component.source = 'youtube';
      component.id = match[1].replace(toReplace, '');
      component.url = `https://www.youtube.com/watch?v=${component.id}`;
      component.thumbnails = `http://img.youtube.com/vi/${component.id}/hqdefault.jpg`;
    }

    // hr
    if (element === '---') {
      component.type = 'hr';
      component.text = '';
    }

    if (!component.hasOwnProperty('type')) {
      component.type = 'text';
      component.text = Marked(element);
    }

    if (component.hasOwnProperty('text') && utiles.isEmpty(component.text)) {
      Debug(`Empty ${component.type}`);
    } else {
      this.components.push(component);
    }

    Debug(`Type: ${component.type} - ${element}`);
  }
}

module.exports = Markdown;
