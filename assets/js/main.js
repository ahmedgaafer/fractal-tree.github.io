const canvas = document.getElementById('fractal-tree');
const ctx = canvas.getContext('2d');

/* Fixing canvas render issues */
const dpi = window.devicePixelRatio;
function fix_dpi() {
  let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
  let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
  canvas.setAttribute('height', style_height * dpi);
  canvas.setAttribute('width', style_width * dpi);
}
fix_dpi();
/* */
/* Helper function*/
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/*  */

class fractalTree {
  constructor(ctx, depth, angle){
    this.degToRad = Math.PI / 180.0;
    this.currentColor = 0;
    this.x1 = 600;
    this.y1 = 300;
    this.depth = depth;
    this.angle = angle;
    this.ctx = ctx;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

  }


  drawLine(x1, y1, x2, y2){
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
  }

  drawTree(x1, y1, angle, depth){
    if (depth > 0){
      const x2 = x1 + (Math.cos(angle * this.degToRad) * depth * 10.0);
      const y2 = y1 + (Math.sin(angle * this.degToRad) * depth * 10.0);
      this.drawLine(x1, y1, x2, y2);
      this.drawTree(x2, y2, angle - 20, depth - 1);
      this.drawTree(x2, y2, angle + 20, depth - 1);
    }
  }

  draw(x1, y1){
    this.ctx.beginPath();
    this.drawTree(x1, y1, this.depth, this.angle);
    this.ctx.closePath();
    this.ctx.stroke();
  }
}


window.onload = () => {
  let depth = parseInt(document.getElementById('depth').value);
  let angle = parseInt(document.getElementById('angle').value);
  let tree = new fractalTree(ctx, angle, depth);
  
  console.log(depth , angle);
  if(depth < 13){
    tree.draw(canvas.clientWidth / 2 , canvas.clientHeight);
  }
  else{
    tree.draw(canvas.clientWidth , canvas.clientHeight*2);
  }


  document.getElementById('submit').addEventListener('click', () => {
    depth = parseInt(document.getElementById('depth').value);
    angle = parseInt(document.getElementById('angle').value);
    tree = new fractalTree(ctx, angle, depth);

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    if(depth < 13){
      tree.draw(canvas.clientWidth / 2 , canvas.clientHeight);
    }
    else{
      ctx.scale(0.5, 0.5);
      tree.draw(canvas.clientWidth , canvas.clientHeight * 2);
      ctx.scale(2, 2);
    }
  })
}
