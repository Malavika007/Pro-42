var backImage,backgr;
var player, player_running;
var ground,ground_img,banana_img;
var FoodGroup,banana;
var stone_img,ObstacleGroup;
var score;


var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_img = loadImage("banana.png");
  stone_img = loadImage("stone.png")
}

function setup() {
  createCanvas(800,600);

  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
  
  backgr=createSprite(0,0,800,600);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  score = 0;
}

function draw() { 
  background(0);

  text("Score:" + score, 300, 100);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if (FoodGroup.isTouching(player)) {
      FoodGroup.destroyEach();
      score = score+2;
      player.scale += +0.05;
    }

    spawnFood();
    spawnObstacles();
  
    
    
  }

  if (ObstacleGroup.isTouching(player)) {
    gameState = END
  }

   if (gameState === END){
    backgr.velocityX=0;
    player.visible=false;
    FoodGroup.destroyEach();
    ObstacleGroup.destroyEach();

    textSize(30);
    fill(255)
    text("GAME OVER ",300,220);
  }

 

  drawSprites();
}

function spawnFood() {
  if (frameCount%80 === 0) {
    banana = createSprite(600,270,40,10);
    banana.y=random(0,200);
    banana.addImage(banana_img);
    banana.scale = 0.05;
    banana.velocityX=-4;

    banana.lifetime = 300;
    player.depth = banana.depth+1;
    FoodGroup.add(banana);
    

  }
}


function spawnObstacles() {
  if (frameCount%80 === 0) {
    var stone = createSprite(600,300,40,10);
    stone.y=random(0,200);
    stone.addImage(stone_img);
    stone.scale = 0.09;
    stone.velocityX=-4;

    stone.lifetime = 300;
    player.depth = stone.depth+1;
    ObstacleGroup.add(stone);
    

  }
}
