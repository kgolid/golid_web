var sketch1 = require("./figures/sketch.js");
var sketch2 = require("./figures/graph_fun.js");
var sketch3 = require("./figures/layout_box.js");

module.exports = [
  {
    id: 1,
    title: "Blueprint",
    date: "2016-07-31",
    description: "Randomly generating partitions of random rectangles.",
    figure_name: "sketch1",
    figure: sketch1,
    figure_object: null
  },
  {
    id: 2,
    title: "Particle Network",
    date: "2015-09-01",
    description: "Particles interacting with each other and the environment",
    figure_name: "sketch2",
    figure: sketch2,
    figure_object: null
  },
  {
    id: 3,
    title: "Layouts",
    date: "2015-09-01",
    description: "Random grid layouts",
    figure_name: "sketch3",
    figure: sketch3,
    figure_object: null
  }
];
