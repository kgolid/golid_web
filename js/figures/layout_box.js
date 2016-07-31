var p5 = require('p5');

var sketch = function (p) {

  var squares;
  var box_dim = 100;
  var frame_width = 8;

  var c;

p.setup = function () {
  p.createCanvas(500,500);
  p.smooth();
  p.frameRate(2);
  p.background(235,105,40);
  p.noStroke();

  squares = new Array(16);

  for(var i=0; i < squares.length; i++){
    squares[i] = new Square((i%4)*120, p.floor(i/4) * 120, box_dim, frame_width);
  }
}

p.draw = function () {
  p.push();
  p.translate(20,20);
  for(var s in squares) {
    squares[s].display();
  }
  p.pop();

  c = p.floor(p.random(16));
  squares[c] = new Square(squares[c].posx, squares[c].posy, box_dim, frame_width);
}

  function Square(x, y, dim, frame){
    this.posx = x;
    this.posy = y;
    this.dim = dim;
    this.frame = frame;
    this.innerDim = dim-frame*2;

    this.col = p.floor(p.random(2,6));
    this.colDim = this.innerDim/this.col;
    this.row = p.floor(p.random(2,6));
    this.rowDim = this.innerDim/this.row;

    this.visible = Array(this.col);
    for(var i = 0; i < this.visible.length; i++) {
      this.visible[i] = Array(this.row);
      for(var j = 0; j < this.visible[i].length; j++) {
        this.visible[i][j] = p.random(4);
      }
    }


    this.display = function () {
      p.push();
      p.translate(this.posx,this.posy);
      p.fill(49);
      p.rect(0,0,this.dim,this.dim);

      for(var i = 0; i < this.visible.length; i++) {
        for(var j = 0; j < this.visible[i].length; j++)
          if(this.visible[i][j] > 1) this.drawBlock(i,j);
      }
      p.pop();
    }

    this.drawBlock = function (i, j){
      var xpos = this.frame + i * this.colDim ;
      var ypos = this.frame + j * this.rowDim ;
      p.fill(235,105,40);
      p.rect(xpos + 1, ypos + 1, this.colDim - 1, this.rowDim - 1);
    }
  }
}

module.exports = sketch;
