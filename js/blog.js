var p5 = require('p5');
var sketch = require("./sketch.js");

var blog = {
  state: 'init',
  templates: {
    container: document.querySelector('#blog-template'),
    card: document.querySelector('#card-template')
  },
  init: function (app) {
    this.app = app;
  },
  render: function () {
    var container = this.templates.container.content.cloneNode(true);
    this.app.main.appendChild(container);

    var card = this.templates.card.content.cloneNode(true);
    card.querySelector('.title').innerText = "Sketch numero uno";
    card.querySelector('.figure').id = "sketch1"
    document.querySelector('.blog').appendChild(card);

    new p5(sketch, "sketch1");
  }
}

module.exports = blog
