var Fijado = require('./fijado');
var prompt = require('prompt');
var colors = require('colors');

var cli = {
  fetch: () => {
    prompt.start();
    prompt.get(['url'], (err, params) => {
      let fijado = new Fijado(params.url);

      // result
      fijado.fetch((article) => {
        console.log(JSON.stringify(article, null, 2));
      });
    });
  },

  error: (param) => {
    var message = '';
    switch (param){
      case 0:
        message = 'Required to enter a command.';
      break;
      case 1:
        message = 'The command you entered does not exist.';
      break;
    }
    console.log(colors.red(message));
  },
};

module.exports = cli;
