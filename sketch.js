const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, rope_two, rope_three, fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_two;
var fruit_con_three;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;
var blowerBtn;
var bgSound, eatSound, sadSound, cutSound, blowerSound;
var mute;
var canvasWidth, canvasHeight;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  bgSound = loadSound("sound1.mp3");
  sadSound = loadSound("sad (2).wav")
  eatSound = loadSound("eating_sound.mp3");
  cutSound = loadSound("rope_cut.mp3")
  blowerSound = loadSound("air (2).wav");

  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    canvasWidth = displayWidth;
    canvasHeight = displayHeight;
    createCanvas(canvasWidth, canvasHeight);
  } else {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(canvasWidth, canvasHeight);
  }
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(80,30);
  button.size(50,50);
  button.mouseClicked(dropThree);

  button = createImg('cut_btn.png');
  button.position(370,140);
  button.size(50,50);
  button.mouseClicked(dropTwo);

  button = createImg('cut_btn.png');
  button.position(260,30);
  button.size(50,50);
  button.mouseClicked(drop);

  /* blowerBtn = createImg('blower.png');
  blowerBtn.position(10,250);
  blowerBtn.size(150,100);
  blowerBtn.mouseClicked(blower); */

  mute = createImg('mute.png');
  mute.position(450,20);
  mute.size(30,30);
  mute.mouseClicked(muteSound);
  
  rope = new Rope(7,{x:280,y:30});
  rope_two = new Rope(8, {x:390, y:140});
  rope_three = new Rope(8, {x:100, y:30});
  ground = new Ground(canvasWidth/2,canvasHeight-30,canvasWidth,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(420,canvasHeight-100,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_two = new Link(rope_two, fruit);
  fruit_con_three = new Link(rope_three, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

  bgSound.play();
  bgSound.loop = true;
  bgSound.setVolume(0.2);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,canvasWidth,canvasHeight);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope_two.show();
  rope_three.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eatSound.play();
    eatSound.loop = false;
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
     bgSound.stop();
     sadSound.play();
     sadSound.loop = false;
   }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  cutSound.play();
  cutSound.loop = false;
}

function dropTwo()
{
  rope_two.break();
  fruit_con_two.dettach();
  fruit_con_two = null; 
  cutSound.play();
  cutSound.loop = false;
}

function dropThree()
{
  rope_three.break();
  fruit_con_three.dettach();
  fruit_con_three = null; 
  cutSound.play();
  cutSound.loop = false;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

/* function blower() {
  Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0});
  blowerSound.play();
  blowerSound.loop = false;
} */

function muteSound() {
  if (bgSound.isPlaying()) {
    bgSound.stop();
  }
  else {
    bgSound.play();
  }
}
