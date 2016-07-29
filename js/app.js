var house

var max_dim = 400;

function setup() {
  var canv = createCanvas(500,500);
  canv.parent("carousel");
  background(10,200,155);
  noFill();
  stroke(51,51,51);
  frameRate(2);

  house = new House(random(max_dim / 2, max_dim),random(max_dim / 2, max_dim));
}

function draw() {
  background(10,200,155);
  house.display_house();
  if(!house.done){
    house.build_wall();
  } else {
    house = new House(random(max_dim / 2, max_dim),random(max_dim / 2, max_dim));
  }
}

function House(dimx, dimy) {
  this.dim = new p5.Vector(dimx,dimy);
  this.number_of_rooms = random(8,12);
  this.outer_walls = new Room(this.dim.x, this.dim.y, (width-this.dim.x)/2, (height-this.dim.y)/2);
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
      var f = random(r.dim.x/3) + r.dim.x/3;
      var r1 = new Room(f, r.dim.y, r.pos.x, r.pos.y);
      var r2 = new Room(r.dim.x - f, r.dim.y, r.pos.x + f, r.pos.y);
      this.rooms.push(r1);
      this.rooms.push(r2);
    } else {
      var f = random(r.dim.y/3) + r.dim.y/3;
      var r1 = new Room(r.dim.x, f, r.pos.x, r.pos.y);
      var r2 = new Room(r.dim.x, r.dim.y - f, r.pos.x, r.pos.y + f);
      this.rooms.push(r1);
      this.rooms.push(r2);
    }
  }

  this.display_house = function() {
    strokeWeight(8);
    this.outer_walls.display_room();
    strokeWeight(1);
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
    rect(this.pos.x, this.pos.y, this.dim.x, this.dim.y);
  }
}
