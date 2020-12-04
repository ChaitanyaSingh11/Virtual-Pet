let database, foodS, foodStock;
let dog, mood = "hungry",
  min = 0;
// variables for milk
let milkImg, milk;

function preload() {
  // loading milk image
  milkImg = loadImage('Assets/milk.png');
  // bg
  bg = loadImage('Assets/bg.png');
  // dog_idle animation
  idle = loadAnimation('Assets/idle1.png', 'Assets/idle2.png', 'Assets/idle3.png', 'Assets/idle4.png');
  // dog_happy image
  happy = loadImage("Assets/happy.png");
  // loading pixelated font
  pixel = loadFont("Assets/Pixel.ttf");
}

function setup() {
  // creating canvas 
  createCanvas(1000, 1000);
  // initialising database
  database = firebase.database();
  // referring to foodStock in database
  foodS = database.ref('Food');
  // reading the value of stock from database
  foodS.on("value", readStock);

  // character of a dog
  dog = createSprite(width / 2, 650);
  dog.addAnimation("idle", idle);
  dog.addImage("happy", happy);
  dog.scale = 0.5;
}

function draw() {
  background(bg);

  if (mood == "hungry") {
    if (keyWentDown('up')) {
      mood = "happy";
      dog.changeImage('happy', happy);
      writeStock(foodStock);
    }
  }

  if (frameCount % 1800 == 0 && mood == "happy") {
    dog.changeAnimation('idle', idle);
    mood = "hungry";
  }
  drawSprites();
  // displaying the stock
  textSize(36);
  textFont(pixel);
  stroke(0);
  strokeWeight(3);
  fill(0);
  text("x " + foodStock, 130, 150);
  imageMode(CENTER);
  image(milkImg, 50, 100);
}

function readStock(data) {
  foodStock = data.val();
}

function writeStock(x) {
  if (x <= 0)
    x = 0;
  else
    x--;

  database.ref('/').update({
    Food: x
  });
}