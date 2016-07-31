var p5 = require('p5');
var sketch_base = require('./card_base.js');

var blog = {
  app: null,
  sketches: sketch_base,
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

    for(var i in this.sketches) {
      this.renderCard(this.sketches[i]);
    }
  },
  renderCard: function (sketch) {
    var card = this.templates.card.content.cloneNode(true);
    card.querySelector('.title').innerText = sketch.title;
    card.querySelector('.description').innerText = sketch.description;
    card.querySelector('.figure').id = sketch.figure_name;
    document.querySelector('.blog').appendChild(card);

    sketch.figure_object = new p5(sketch.figure, sketch.figure_name);
  },
  stop: function () {
    for(s in this.sketches)
      this.stopSketch(this.sketches[s]);
  },
  stopSketch: function (sketch) {
    sketch.figure_object.remove();
  }

}

module.exports = blog
