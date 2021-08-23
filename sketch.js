var path;
var pathIMG;

var guy;
var guy_running;

var coin, coinIMG;
var coinCount = 0;

var gameState = "info";

var coinCount_lost = 0;

var edges;

var x = 3;

var bomb, bombIMG;

function preload(){
  pathIMG = loadImage ("path.png");
  guy_running = loadAnimation ("Runner-1.png", "Runner-2.png");

  coinIMG = loadImage ("coin.png");

  bombIMG = loadImage ("bomb.png");
}

function setup(){
  createCanvas(400,400);
  
  path = createSprite (250, 200);
  path.addImage (pathIMG);
  console.log (path.height + " " + path.width);
  
  console.log (path.width);

  guy = createSprite (200, 300);
  guy.scale = 0.06;
  guy.addAnimation ("guyRunning", guy_running);

  coin = createSprite (200, 0);
  coin.scale = 0.4;
  coin.addImage (coinIMG);

  // bomb = createSprite (200, -100);
  // bomb.addImage (bombIMG);

  edges = createEdgeSprites ();
}

function draw() {
  background("white");

  fill ("blue");

  stroke ("red");
  strokeWeight (2);

  textSize (12);

  if (gameState == "info") {
    pathCoinGuy_Invisible ();
    textSize (20);

    text ("Get as many coins as possible!", 10, 200);
    text ("If you lose 3 coins, then its game over!", 10, 230);
    text ("There's no time limit!", 10, 260);
    text (" Press 'Space' to proceed", 10, 290);

    textSize (12);
    text ("Press 'up Arrow' to end the game when playing", 10, 310);
  }
 
  if (keyDown ('space') && gameState == "info") {
    gameState = "inProgress";
  }

  if (gameState == "inProgress") {
    text ("coins: " + coinCount, 1, 15);
    text ("coins lost: " + coinCount_lost, 1, 30);


    pathCoinGuy_Visible ();

    guy.x = World.mouseX;

    if (guy.x < 150 || guy.x > 350) {
      if (guy.x < 150) {
        guy.x = 150;
      } else if (guy.x > 350) {
        guy.x = 350;
      }
    }

    if (path.y > 299){
      path.y = path.height / 5.007;
    }

    if (coin.isTouching (guy))  {
      coinCount ++;

      coin.x = Math.round (random (135, 365));
      coin.y = 0;

      x = x + 2;

      if (x > 25) {
        x = 25;
      }
    }

    if (coin.isTouching (edges [3])) {
      coinCount_lost ++;

      if (coinCount_lost === 3) {
        gameState = "over";
      }
      coin.x = Math.round (random (135, 365));
      coin.y = 0;
    }

    // if (frameCount % 100 === 0) {
    //   bomb = createSprite (Math.round (random (135, 365)), 0);
    //   bomb.addImage (bombIMG);
    // }
  }

  if (keyDown ("up_arrow") && gameState == "inProgress") {
    pathCoinGuy_Invisible ();

    gameState = "fullEnd";
  } 

  if (gameState == "over") {
    pathCoinGuy_Invisible ();

    textSize (20);

   text ("GameOver!", 25, 200);
   if (coinCount > 150 || coinCount < 150) {
     if (coinCount > 150) {
        text ("Final Score:" + coinCount + "  Ha! You're too good!", 25, 230); 
     } else {
        text ("Final Score:" + coinCount, 25, 230);
     }
   }
   text ("press 'space' to restart the game", 25, 260);
   text ("press 'down arrow' to end the game", 25, 290);
  }

  if (keyDown ('space') && gameState == "over") {
    coin.x = Math.round (random (135, 365));
    coin.y = 0;

    coinCount = 0;
    coinCount_lost = 0;
    
    gameState = "inProgress";
  }

  if (keyDown ('down_arrow') && gameState == "over") {
    gameState = "fullEnd";
  }

  if (gameState == "fullEnd") {
    textSize (20);

    text ("The game has fully ended.", 100, 200);
    text ("Thanks for playing!!", 100, 230);
  }
  drawSprites ();
}

function pathCoinGuy_Visible () {
  guy.visible = true;

  if (x == 0) {
    x = 3;
  }

  path.visible = true;
  path.velocityY = x;

  coin.visible = true;
  coin.velocityY = x;
}

function pathCoinGuy_Invisible () {
  x = 0;

  guy.visible = false;

  path.visible = false;

  coin.visible = false;
}