var background1,backgroundI;
var airplane,airplaneI;
var obstacleI,obstacleG;
var rewardI,rewardG;
var gameState="PLAY"
var life=2
var Money=0
var gameOver,gameOverI;
var reset,resetI;
var deathSound;

function preload(){
backgroundI=loadImage("background.png")
airplaneI=loadImage("airplane.png")
  obstacleI=loadImage("obstacle.png")
  rewardI=loadImage("reward.png")
  gameOverI=loadImage("gameover.png")
  resetI=loadImage("reset.png")
  deathSound=loadSound("deathSound.wav")
}

function setup() {
  createCanvas(displayWidth - 30 , displayHeight - 20)
 background1=createSprite(200,200)
background1.addImage("Background",backgroundI)
  background1.scale=1.5
 airplane=createSprite(80,200)
  airplane.addImage("Airplane",airplaneI)
  airplane.scale=0.22
  obstacleG=createGroup()
  rewardG=createGroup()
   gameOver=createSprite(200,100)
   gameOver.addImage("Game Over",gameOverI)
   reset=createSprite(200,300)
   reset.addImage("Restart",resetI)
   reset.scale=0.5
  airplane.setCollider("rectangle",0,0,airplane.width,airplane.height/2)

}

function draw() {
  camera.position.x = airplane.x;
  if(gameState==="PLAY"){
  background("White")
  gameOver.visible=false
  reset.visible=false
  background1.velocityX=-4
  airplane.y=mouseY

if(background1.x<80){
  background1.x=background1.width/6
}
reward()
 obstacle()
if(airplane.isTouching(rewardG)){
  Money=Money+1
  rewardG.destroyEach()
}
  
if(airplane.isTouching(obstacleG)&&life===2){
  life=life-1
  obstacleG.destroyEach()
}
if(airplane.isTouching(obstacleG)&&life==1){
  life=life-1
  obstacleG.destroyEach()
  gameState="END"
  deathSound.play()
}
  }
  if(gameState==="END"&&life===0){
    background1.velocityX=0;
    gameOver.visible=true
    reset.visible=true
    if(mousePressedOver(reset)){
      gameState="PLAY"
      Money=0
      life=2
    }
  }


drawSprites()
stroke("Red")
textSize(18)
fill("Red")
text("Money : $"+Money,300,20)
text("Life : "+life,300,40)


}
function obstacle(){
  if(frameCount%300===0){
    var obstacle=createSprite(800,Math.round(random(10,390)))
    obstacle.addImage("Bird",obstacleI)
    obstacle.velocityX=-6
    obstacle.scale=0.15
    obstacle.lifetime=360
    obstacleG.add(obstacle)
  }
}
function reward(){
  if(frameCount%315===0){
    var reward=createSprite(800,Math.round(random(10,390)))
    reward.addImage("Money",rewardI)
    reward.velocityX=-4
    reward.scale=0.45
    reward.lifetime=360
    rewardG.add(reward)
  }
}