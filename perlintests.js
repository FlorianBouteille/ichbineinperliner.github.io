let W = window.innerWidth;
let H = window.innerHeight;
let circles = [15];
let xoff = 0.0;
let slider3;
let config1 = 1;
let config2 = 1;
let config3 = 1;


function setup() 
{
   createCanvas(W, H);
   V1 = new VerticalLine();
   H1 = new HorizontalLine();
   R1 = new CenterRect(300);
   R2 = new CenterRect(400);
   slider3 = createSlider(0.0001, 0.02, 0.0001, 0.0001);
   slider3.position(W/2 - 100, H - 50);
   slider3.style("color", "rgb(0)");
   for (let i = 0; i < 15 ; i++)
   {
     circles[i] = new WanderingCircle(random(100));
   }
   superButton("Bonjour", W/2 - W/24, H/2 - W/22);
}


function draw() 
{
  let blend1 = config1;
  let blend2 = config2;
  let blend3 = config3;
  let speed = slider3.value();
  mixBlend(blend1)
  xoff += 0.01;
  greyBackground();
  R1.display(speed);
  mixBlend(blend2);
  for (let i in circles)
  {
    circles[i].display(speed);
    if (i == 7)
    {
      R2.display(speed);
      mixBlend(blend3);
    }
    // if (Math.floor(frameRate()%20) == 0)
    // {
    //   console.log("prout");
    //   mixBlend();
    // }
  }
  H1.display(speed);
}

class VerticalLine
{
  constructor()
  {
    this.xoff = random(5556987);
    this.lineX = noise(this.xoff) * W;
    this.R = random(255);
    this.V = random(255);
    this.B = random(255);
  }
  
  display(speed)
  {
    this.move(speed);
    stroke(this.R, this.V, this.B);
    strokeWeight(1);
    line(this.lineX, 0, this.lineX, H);
  }
  move(speed)
  {
   this.xoff += speed;
   this.lineX = noise(this.xoff) * W;
  }
}

class HorizontalLine
{
  constructor()
  {
    this.xoff = random(5556987);
    this.lineY = noise(this.xoff) * H;
    this.R = random(255);
    this.V = random(255);
    this.B = random(255);
  }
  
  display(speed)
  {
    this.move(speed);
    stroke(this.R, this.V, this.B);
    strokeWeight(1);
    line(0, this.lineY, W, this.lineY);
  }
  move(speed)
  {
   this.xoff += speed;
   this.lineY = noise(this.xoff) * H;
  }
}

class WanderingCircle
{
  constructor(size)
  {
    this.size = size;
    this.xoff = random(574000);
    this.yoff = this.xoff + 20;
    this.zoff = random(87510);
    this.Xpos = noise(this.xoff)*W;
    this.Ypos = noise(this.yoff)*H;
    this.R = 255;
    this.V = 255;
    this.B = 255;
  }
  
  move(speed)
  {
    this.xoff += speed;
    this.yoff += speed;
    this.zoff += 0.01;
    this.Xpos = (noise(this.xoff)*W*2) - 700;
    this.Ypos = noise(this.yoff)*H;
  }
  vary()
  {
    this.size += noise(this.zoff);
    this.size -= noise(this.yoff);
  }
  display(speed)
  {
    this.move(speed);
    this.vary();
    noStroke();
    fill(noise(this.xoff)*this.R, noise(this.yoff)*this.V, noise(this.zoff)*this.B);
    circle(this.Xpos, this.Ypos, this.size);
  }
}

class CenterRect
{
  constructor(thesize)
  {
    this.xoff = random(456789132);
    this.yoff = random(123456);
    this.R = 255;
    this.V = 255;
    this.B = 255;
    this.size = 0;
    this.originalSize = thesize;
  }
  
  vary(speed)
  {
    this.xoff += speed;
    this.yoff += speed;
    this.size = noise(this.xoff)*this.originalSize;
  }
  display(speed)
  {
    this.vary(speed);
    rectMode(CENTER);
    noStroke();
    fill(int(noise(this.yoff)*255), int(noise(this.xoff)*155), 255 - int(noise(this.xoff) * 255));
    rect(W/2, H/2, this.size * W / H, this.size);
  }
}

function greyBackground()
{
  background(noise(xoff) * 255);
}

function yellowBackground()
{
  background(255, 255, noise(xoff) * 255);
}

function mixBlend(number)
{
  switch(number)
  {
    case 1 :
      blendMode(BLEND);
      break;
    case 2 :
      blendMode(ADD);
      break;
    case 3 :
      blendMode(DARKEST);
      break;
    case 4 :
      blendMode(LIGHTEST);
      break;
    case 5 :
      blendMode(EXCLUSION);
      break;
    case 6 :
      blendMode(SCREEN);
      break;
    case 7 :
      blendMode(REPLACE);
      break;
    case 8 : 
      blendMode(REMOVE);
      break;
    case 9 : 
      blendMode(OVERLAY);
      break;
    case 10 :
      blendMode(DODGE);
      break;
    case 11 :
      blendMode(BURN);
      break;
    case 12 :
      blendMode(HARD_LIGHT);
      break;
  }
  console.log(number);
}

function superButton(name, posX, posY)
{
  let buttonSize = W/20;
  name = createButton("");
  name.position(posX, posY);
  name.style("padding", buttonSize);
  name.style("border", "none");
  name.style("background", "rgba(125, 125, 125, 0)");
  name.style("border-radius", "100%");
  name.mouseOver(function()
                {
                    name.style("background", "rgba(85, 85, 85, 0.8)");
                    console.log("yolo");
                })
  name.mouseClicked(function()
                {
                    name.style("background", "rgba(125, 125, 125, 0)"); 
                    config1 = Math.floor(Math.random()*12 + 1);
                    config2 = Math.floor(Math.random()*12 + 1);
                    config3 = Math.floor(Math.random()*12 + 1);
                })
} 