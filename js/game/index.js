

//Create a Pixi Application
const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight - (10 * 16) - 60, backgroundColor: 0xaaaaaa, });

// Append the canvas to the HTML body
document.body.appendChild(app.view);


const runningTextures = [];

for (let i=0;i<6;i++){
  var path = `./images/run/run_${i}.png`;

  runningTextures.push(PIXI.Texture.from(path));
}

const jumpingTextures = [];

for (let i=0;i<6;i++){
  var path = `./images/jump/jump_${i}.png`;
  jumpingTextures.push(PIXI.Texture.from(path));
}

const idleTextures = [];

for (let i=0;i<4;i++){
  var path = `./images/idle/idle_${i}.png`;
  idleTextures.push(PIXI.Texture.from(path));
}

// Load an image and create a sprite
const sprite = new PIXI.AnimatedSprite(idleTextures);
const platform = PIXI.Sprite.from("./images/platformMossy.png");
const backgroundTexture = PIXI.Texture.from("./images/brickWall.png");
const backgroundImage = new PIXI.Sprite(backgroundTexture);
const portal = PIXI.Sprite.from("./images/portal.gif");


// Set the size of the background image to match the application size
backgroundImage.width = app.screen.width;
backgroundImage.height = app.screen.height;

// Add the background image to the stage
app.stage.addChild(backgroundImage);

// const portalGif = document.createElement('img');
// portalGif.src = 'images/portal.gif';
// const containerElement = document.body;
// containerElement.appendChild(portalGif);

// Size of sprite
sprite.width = 82;
sprite.height = 130;

// Size of platform
platform.width = 182;
platform.height = 34;

portal.width = 96;
portal.height = 96;

// Set the initial position of the sprite
sprite.x = 100;
sprite.y = 100;

sprite.animationSpeed = 0.1;
sprite.autoUpdate = true;

// Set the initial position of the platform
platform.x = 800;//1700;
platform.y = 400;//800;

//portals location on screen
portal.x = app.screen.width-portal.width;
portal.y = 0;

// Initial velocity values
let vy = 0;
let vx = 0;
let moveSpeed = 400;
let jumpSpeed = 600;
let jumping = false;
let g = 20; // force of gravity

// Add the sprite to the stage
app.stage.addChild(sprite);
app.stage.addChild(platform);
app.stage.addChild(portal);

function checkInputs(){
  vx = 0;

  if (!controller.wPressed && !controller.aPressed && !controller.dPressed){
    sprite.textures = idleTextures;
  }
  
  if (controller.wPressed && !jumping) {
    vy -= jumpSpeed;
    jumping = true;
    sprite.textures = jumpingTextures;
  }
  if (controller.aPressed){
    vx = -moveSpeed;
    sprite.scale.x = -2;
    sprite.textures = runningTextures;
  }
  if (controller.dPressed){
    vx = moveSpeed;
    sprite.scale.x = 2;
    sprite.textures = runningTextures;
  }
}

function checkCollisions(){
  if (hasCollided(sprite, platform)) {
    if (jumping){
      jumping = false;
    }
    vy = -g;
  } 
  if (hasCollided(sprite, portal)) {
    console.log('Collided with portal!');
    sprite.visible = false;
  } 
}

function update(dt){

  vy += g;
  sprite.y += vy * dt;
  sprite.y = Math.min(app.screen.height - sprite.height, sprite.y);
  sprite.y = Math.max(0, sprite.y)

  if (sprite.y + sprite.height == app.screen.height){
    vy = 0;
    jumping = false;
  }

  sprite.x += vx * dt;
  sprite.x = Math.min(app.screen.width - sprite.width, sprite.x);
  sprite.x = Math.max(0, sprite.x);
}

function debug(dt){
  console.log(`pos: {${sprite.x}, ${sprite.y}}`);
  console.log(`vx: ${vx}`);
  console.log(`vy: ${vy}`);
  console.log(`dt: ${dt}`);
}

//delta time
let t = 0;
let priorTicks = Date.now();
let dt = 0;

// Set up the game loop
app.ticker.add(() => {
  t = Date.now();
  dt = (t - priorTicks) / 1000;
  priorTicks = t;

  sprite.play();
  checkInputs();
  update(dt);
  checkCollisions();
  // debug(dt);
  
  if (controller.rightClickPressed) {
      platform.x = app.renderer.plugins.interaction.mouse.global.x - platform.width / 2;
      platform.y = app.renderer.plugins.interaction.mouse.global.y - platform.height / 2;
  }
});

// Function to check for collision between two sprites
function hasCollided(sprite, platform) {
  return (
    sprite.x < platform.x + platform.width &&
    sprite.x + sprite.width > platform.x &&
    sprite.y < platform.y + platform.height &&
    sprite.y + sprite.height > platform.y
  );
}
// Function to handle right-click events
window.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // Prevent the default context menu from appearing
    controller.rightClickPressed = true;
});

// Function to handle mouse up events
window.addEventListener("mouseup", function (event) {
    controller.rightClickPressed = false;
});

