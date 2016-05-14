# fijado

Convert the article from a blog to JSON by its url.

## Global

    $ npm i -g fijado

Try:

    $ fijado http://www.loquedebessaber.com/a-ella-le-gusta-que-le-peguen/

## module

    $ npm i fijado --save

Try:

    const Fijado = require('fijado');
    const url = 'http://www.loquedebessaber.com/a-ella-le-gusta-que-le-peguen/';

    let fijado = new Fijado(url);

    // fetch
    fijado.fetch((article) => {
      console.log(JSON.stringify(article, null, 2));
    });
