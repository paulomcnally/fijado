const Fijado = require('./fijado');
const Colors = require('colors');

var cli = {
  fetch: (url) => {
    let fijado = new Fijado(url);

    // result
    fijado.fetch((article) => {
      console.log(JSON.stringify(article, null, 2));
    });
  },

  error: (param) => {
    var message = '';
    switch (param){
      case 0:
        message = 'A url is required as a parameter.';
      break;
    }
    console.log(Colors.red(message));
  },
};

module.exports = cli;
