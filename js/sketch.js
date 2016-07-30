var p5 = require('p5');

var sketch = function(p) {

  var house
  var max_dim = 400;

  p.setup = function() {
    p.createCanvas(500,500);
    p.background(10,200,155);
    p.noFill();
    p.frameRate(2);
    p.stroke(51);

    house = new House(p.random(max_dim / 2, max_dim), p.random(max_dim / 2, max_dim));
  }

  p.draw = function() {
    p.background(10,200,155);
    house.display_house();
    if(!house.done){
      house.build_wall();
    } else {
      house = new House(p.random(max_dim / 2, max_dim), p.random(max_dim / 2, max_dim));
    }
  }

  function House(dimx, dimy) {
    this.dim = new p5.Vector(dimx,dimy);
    this.number_of_rooms = p.random(8,12);
    this.outer_walls = new Room(this.dim.x, this.dim.y, (p.width-this.dim.x)/2, (p.height-this.dim.y)/2);
    this.rooms = [];
    this.rooms.push(this.outer_walls);
    this.done = false;

    this.build_wall = function() {
      if (this.rooms.length < this.number_of_rooms){
        var r = this.pop_biggest_room();
        this.split_room(r);
      } else {
        this.done = true;
      }
    }

    this.pop_biggest_room = function() {
      var biggest = 0;
      for(var i = 0; i < this.rooms.length; i++){
        if(this.rooms[i].get_area() > this.rooms[biggest].get_area())
          biggest = i;
      }
      return this.rooms.splice(biggest,1)[0];
    }

    this.split_room = function(r) {
      if(r.dim.x > r.dim.y){
        var f = p.random(r.dim.x/3) + r.dim.x/3;
        var r1 = new Room(f, r.dim.y, r.pos.x, r.pos.y);
        var r2 = new Room(r.dim.x - f, r.dim.y, r.pos.x + f, r.pos.y);
        this.rooms.push(r1);
        this.rooms.push(r2);
      } else {
        var f = p.random(r.dim.y/3) + r.dim.y/3;
        var r1 = new Room(r.dim.x, f, r.pos.x, r.pos.y);
        var r2 = new Room(r.dim.x, r.dim.y - f, r.pos.x, r.pos.y + f);
        this.rooms.push(r1);
        this.rooms.push(r2);
      }
    }

    this.display_house = function() {
      p.strokeWeight(8);
      this.outer_walls.display_room();
      p.strokeWeight(1);
      for(a in this.rooms)
        this.rooms[a].display_room();
    }
  }


  function Room(w, h, x, y) {
    this.dim = new p5.Vector(w,h);
    this.pos = new p5.Vector(x,y);

    this.get_area = function(){
      return this.dim.x * this.dim.y;
    }

    this.display_room = function(){
      p.rect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
    }
  }
};

module.exports = sketch;
