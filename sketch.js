var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var treasureCollection = 0,score = treasureCollection;

var cashGroup;
var diamondsGroup;
var jwelleryGroup;
var swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-2,20,20);
boy.addAnimation("U",boyImg);
boy.scale=0.08;
boy.setCollider("circle",0,0,400);
boy.debug = false

gameOver = createSprite(width/2,height/2,20,20);
gameOver.addImage(endImg);
gameOver.scale=1;




cashGroup     = new Group();
diamondsGroup = new Group();
jwelleryGroup = new Group();
swordGroup    = new Group();

  
}

function draw() {

  background(0);
  
 
  
  path.depth = score.depth
  score.depth = score.depth+1
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  
if (gameState===PLAY){
  
  boy.x = World.mouseX;
  

  gameOver.visible = false;
  
  
   if(path.y > height){
    path.y = height/2;
  }
  
  createCash();
  createDiamonds();
  createJwellery();
  createSword();

   

    if (cashGroup.isTouching(boy)) {
      cashGroup.destroyEach();
      treasureCollection = treasureCollection+50;
      
    }
    else if (diamondsGroup.isTouching(boy)) {
      diamondsGroup.destroyEach();
      treasureCollection = treasureCollection+150;
      
      
    }else if(jwelleryGroup.isTouching(boy)) {
      jwelleryGroup.destroyEach();
      treasureCollection = treasureCollection+100;
      
      
    }else if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END
      
    }
    
 
  
}
else if (gameState===END){
  
  background("grey");
  
  gameOver.visible = true;
  
  swordGroup.destroyEach();
  jwelleryGroup.destroyEach();
  cashGroup.destroyEach();
  diamondsGroup.destroyEach();
  
  boy.lifetime = 0;
  path.lifetime =0;
}
  

  drawSprites();
   textSize(30);
  fill("black");
  text("Treasure: "+ treasureCollection,width/2.50,30);
   
   
}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 250;
  cashGroup.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50,width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 250;
  diamondsGroup.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50,width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 250;
  jwelleryGroup.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50,width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 250;
  swordGroup.add(sword);
  }
}
