var score = 0;
var gun, blueBubble, redbubble, bullet, backBoard;

var gunImg, bulletImg, blastImg, backBoardImg;
var blueBubbleImg, redBubbleImg;

var redBubbleGroup, blueBubbleGroup, bulletGroup;

var life = 3;
var gameState = 1;

function preload() {
  gunImg = loadImage("gun1.png");
  blastImg = loadImage("blast.gif");
  bulletImg = loadImage("bullet1.png");
  blueBubbleImg = loadImage("waterBubble.png");
  redBubbleImg = loadImage("redbubble.png");
  backBoardImg = loadImage("back.jpg");
}

function setup() {
  createCanvas(800, 600);

  backBoard = createSprite(50, width / 2, 100, height);
  backBoard.addImage(backBoardImg);

  gun = createSprite(100, height / 2, 50, 50);
  gun.addImage(gunImg);
  gun.scale = 0.2;

  bulletGroup = createGroup();
  blueBubbleGroup = createGroup();
  redBubbleGroup = createGroup();

  heading = createElement("h1");
  scoreboard = createElement("h1");
}

function draw() {
  background("#BDA297");

  heading.html("Life: " + life);
  heading.style('color', 'red');
  heading.position(150, 20);

  scoreboard.html("Score: " + score);
  scoreboard.style('color', 'red');
  scoreboard.position(width - 200, 20);

  if (gameState === 1) {
    gun.y = mouseY;

    if (frameCount % 80 === 0) {
      drawBlueBubble();
    }

    if (frameCount % 100 === 0) {
      drawRedBubble();
    }

    if (keyDown("space")) {
      shootBullet();
    }

    if (blueBubbleGroup.collide(backBoard)) {
      handleGameOver(blueBubbleGroup);
    }
    if (redBubbleGroup.collide(backBoard)) {
      handleGameOver(redBubbleGroup);
    }

    if (blueBubbleGroup.isTouching(bulletGroup)) {
      handleBubbleCollision(blueBubbleGroup);
    }

    if (redBubbleGroup.isTouching(bulletGroup)) {
      handleBubbleCollision(redBubbleGroup);
    }

    drawSprites();
  }
}

function drawBlueBubble() {
  blueBubble = createSprite(800, random(20, 780), 40, 40);
  blueBubble.addImage(blueBubbleImg);
  blueBubble.scale = 0.1;
  blueBubble.velocityX = -8;
  blueBubble.lifetime = 400;
  blueBubbleGroup.add(blueBubble);
}

function drawRedBubble() {
  redbubble = createSprite(800, random(20, 780), 40, 40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet() {
  bullet = createSprite(150, width / 2, 50, 20);
  bullet.y = gun.y - 20;
  bullet.addImage(bulletImg);
  bullet.scale = 0.12;
  bullet.velocityX = 7;
  bulletGroup.add(bullet);
}

function handleBubbleCollision(bubbleGroup) {
  if (life > 0) {
    score = score + 1;
  }

  var blast = createSprite(bullet.x + 60, bullet.y, 50, 50);
  blast.addImage(blastImg);
  blast.scale = 0.3;
  blast.lifetime = 20;

  bulletGroup.destroyEach();
  bubbleGroup.destroyEach();
}

function handleGameOver(bubbleGroup) {
  life = life - 1;
  bubbleGroup.destroyEach();

  if (life === 0) {
    gameState = 2;
  }
}