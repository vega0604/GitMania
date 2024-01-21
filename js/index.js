

//Create a Pixi Application
const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight - (12 * 16), backgroundColor: 0xaaaaaa, });


// Append the canvas to the HTML body
document.body.appendChild(app.view);


// Load an image and create a sprite
const sprite = PIXI.Sprite.from("./images/girlStanding.png");
const platform = PIXI.Sprite.from("./images/platformMossy.png");
const backgroundTexture = PIXI.Texture.from("images/brickWall.png");
const backgroundImage = new PIXI.Sprite(backgroundTexture);
const portal = PIXI.Sprite.from("./images/portal.gif");


// Set the size of the background image to match the application size
backgroundImage.width = app.screen.width;
backgroundImage.height = app.screen.height;

// Add the background image to the stage
app.stage.addChild(backgroundImage);

const portalGif = document.createElement('img');
portalGif.src = 'images/portal.gif';
const containerElement = document.body;
containerElement.appendChild(portalGif);


// Size of sprite
sprite.width = 82;
sprite.height = 130;

// Size of platform
platform.width = 182;
platform.height = 34;

portal.width = 96;
portal.height = 96;

// Set the initial position of the sprite
sprite.x = 30;
sprite.y = 800;

// Set the initial position of the platform
platform.x = 800;//1700;
platform.y = 400;//800;

//portals location on screen
portal.x = 1200;
portal.y = 100;




// Initial velocity values
let vy = 0;
let vx = 400;
let jumpSpeed = 600;
let g = 20; // force of gravity


//delta time
      
let t = 0;
let priorTicks = 0;
let dt = 0;
// Add the sprite to the stage
app.stage.addChild(sprite);
app.stage.addChild(platform);
app.stage.addChild(portal);



// Save the original starting position of the character
const originalCharacterY = sprite.y;
// Set up the game loop
app.ticker.add(() => {
  t = Date.now();
  dt = (t - priorTicks) / 1000;
  priorTicks = t;

  console.log(dt);
  // Update the sprite's position
  if (controller.wPressed  && vy === 0) {//&& sprite.y >= app.screen.height - sprite.height
    vy -= jumpSpeed;
    console.log("jumping");
  }
  if (controller.aPressed){
    sprite.x -= vx * dt;
    console.log("left");
  }
  if (controller.dPressed){
    sprite.x += vx * dt;
    console.log("right");
  }

  // Update the sprite's vertical position based on velocity
  sprite.y += vy * dt;

  // If the sprite goes off the screen, reset its position
  if (sprite.x >= app.screen.width) {
    sprite.x = 0;
    
  }
  if (sprite.x <= -sprite.width){
    sprite.x = app.screen.width;
  }

  // Prevent the sprite from going below the screen
  if (sprite.y > app.screen.height - sprite.height) {
    sprite.y = app.screen.height - sprite.height;
    vy = 0; // Reset vertical velocity when touching the bottom
  }else if (isCollision(sprite, platform)) {
    // Handle the collision (adjust sprite's position and velocity)
    //sprite.y = platform.y - sprite.height; // Align sprite with the top of the platform
    vy = 0; // Reset vertical velocity when touching the platform
  
  } 
  else if (isCollision(sprite, portal)) {
    // Handle the collision (adjust sprite's position and velocity)
    //sprite.y = platform.y - sprite.height; // Align sprite with the top of the platform
    console.log('Collided with portal!');
      sprite.visible = false;
  
  } 
  else {
    // Apply gravity to simulate falling
    vy += g;
  }  
  
    
    // platform.x = app.renderer.plugins.interaction.mouse.global.x - platform.width / 2;
    // platform.y = app.renderer.plugins.interaction.mouse.global.y - platform.height / 2;



});

// Function to check for collision between two sprites
function isCollision(sprite, platform) {
  return (
    sprite.x < platform.x + platform.width &&
    sprite.x + sprite.width > platform.x &&
    sprite.y < platform.y + platform.height &&
    sprite.y + sprite.height > platform.y
  );
}

// window.addEventListener("mousemove", MovePlatform);


// function MovePlatform(event) {
//     var centerX = platform.offsetWidth / 2;
//     var centerY = platform.offsetHeight / 2;
//     platform.style.left = event.clientX - centerX + "px";
//     platform.style.top = event.clientY - centerY + "px";
//   }