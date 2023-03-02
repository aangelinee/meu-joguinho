var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bolha, bolhaImage;
var agua, aguagrupo, aguaImage;
var fogo, fogogrupo, fogoImage;

var chao, chaoinvisivel, chaoImage;

var score;
var gameOverImg,restartImg;
var jumpSound , checkPointSound, dieSound;


function preload(){
bolhaImage = loadImage ("bolhateste2.PNG");
aguaImage = loadImage ("aguateste1.png");
fogoImage = loadImage ("fogoteste1.png");
chaoImage = loadImage ("chaoteste2.png");

restartImg = loadImage("restart.png");
gameOverImg = loadImage("gameOver.png");
  
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
createCanvas (600,200);

bolha = createSprite(50,160,20,50);
bolha.addImage("bolhinha", bolhaImage);
bolha.scale = 0.5;

chao = createSprite(200,180,400,20);
chao.addImage("chaozinho", chaoImage);
chao.x = chao.width / 2;
chao.velocityX = -4;

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);
  
restart = createSprite(300,140);
restart.addImage(restartImg);
  
gameOver.scale = 0.5;
restart.scale = 0.5;
  
chaoinvisivel = createSprite (200,190,400,10);
chaoinvisivel.visible = false;

fogogrupo = createGroup();
aguagrupo = createGroup();

score = 0;
}

function draw() {
background ("white");

if (gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    
    chao.velocityX = -(4 + 3* score/100);
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() ;
    }
    
    if (chao.x < 0){
      chao.x = chao.width/2;
    }
    
    if(keyDown("space")&& bolha.y >= 100) {
        bolha.velocityY = -12;
        jumpSound.play();
    }
    
    bolha.velocityY = bolha.velocityY + 0.8;
  
    spawnagua();
    spawnfogo();
    
    if(aguagrupo.isTouching(bolha)){
        score = score + 1000;
    }

    if(fogogrupo.isTouching(bolha)){
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    chao.velocityX = 0;
    bolha.velocityY = 0;
    
   
  fogogrupo.setLifetimeEach(-1);
  aguagrupo.setLifetimeEach(-1);
   
   fogogrupo.setVelocityXEach(0);
   aguagrupo.setVelocityXEach(0);    
 }


//impedir que bolha caia
bolha.collide(chaoinvisivel);

if(mousePressedOver(restart)) {
    reset();
  }


drawSprites();
}

function reset(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
fogogrupo.destroyEach();
aguagrupo.destroyEach();
score = 0;

}


function spawnfogo(){
if (frameCount % 60 === 0) {
var fogo = createSprite(600,160,40,10);
fogo.y = Math.round(random(80,120));
fogo.addImage(fogoImage);
fogo.scale = 0.1;
fogo.velocityX = -3;

  fogo.scale = 0.5;
  fogo.lifetime = 300;
 
  fogogrupo.add(fogo);
}
}


function spawnagua() {
if (frameCount % 60 === 0) {
  var agua = createSprite(600,120,40,10);
  agua.y = Math.round(random(80,120));
  agua.addImage(aguaImage);
  agua.scale = 0.5;
  agua.velocityX = -3;
  
  agua.lifetime = 200;
  
  aguagrupo.add(agua);
}
}
