var home = {
  app: null,
  templates: {
    container: document.querySelector('#home-template')
  },
  init: function (app) {
    this.app = app;
  },
  render: function () {
    var container = this.templates.container.content.cloneNode(true);
    container.querySelector('.home').innerText = "Home sweet home!";
    this.app.main.appendChild(container);
  }
}

module.exports = home;
