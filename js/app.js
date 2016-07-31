var home_module = require("./home.js");
var blog_module = require("./blog.js");

var app = {
  state: 'init',
  modules: {
    home: home_module,
    blog: blog_module
  },
  init: function () {
    this.cacheDom();
    this.modules.home.init(this);
    this.modules.blog.init(this);
    this.logo.onclick = this.handleHomeClick.bind(this);
    this.nav_home.onclick = this.handleNavClick.bind(this, 'home');
    this.nav_blog.onclick = this.handleNavClick.bind(this, 'blog');
    this.render();
  },
  cacheDom: function () {
    this.logo = document.querySelector('.logo');
    this.nav_home = document.querySelector('.nav_home');
    this.nav_blog = document.querySelector('.nav_blog');
    this.main = document.querySelector('.main');
  },
  setState: function (state) {
    this.state = state;
  },
  render: function () {
    switch (this.state) {
      case 'init':
        this.nav_home.classList.add("current");
        this.modules.home.render();
        break;
      case 'home':
        this.prepareHome();
        this.modules.home.render();
        break;
      case 'blog':
        this.prepareBlog();
        this.modules.blog.render();
        break;
      default:
    }
  },
  prepareHome: function () {
    this.nav_blog.classList.remove("current");
    this.nav_home.classList.add("current");

    this.main.removeChild(this.main.querySelector('.section'));
  },
  prepareBlog: function () {
    this.nav_home.classList.remove("current");
    this.nav_blog.classList.add("current");

    this.main.removeChild(this.main.querySelector('.section'));
  },
  handleHomeClick: function () {
    if (this.state == 'blog') {
      this.modules.blog.stop();
    }
    this.setState('home');
    this.render();
  },
  handleNavClick: function (target) {
    if (this.state == 'blog') {
      this.modules.blog.stop();
    }

    this.setState(target);
    this.render();
  }
}

app.init();
