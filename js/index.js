

//Create a Pixi Application
const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight-(12*16) });

// Append the canvas to the HTML body
document.body.appendChild(app.view);


// Load an image and create a sprite
const sprite = PIXI.Sprite.from("./images/girlStanding.png");
const platform = PIXI.Sprite.from("./images/platformMossy.png");



// Size of sprite
sprite.width = 82;
sprite.height = 130;

// Size of platform
platform.width = 182;
platform.height = 34;

// Set the initial position of the sprite
sprite.x = 30;
sprite.y = 800;

// Set the initial position of the platform
platform.x = 1200;//1700;
platform.y = 400;//800;



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

// Save the original starting position of the character
const originalCharacterY = sprite.y;
// Set up the game loop
app.ticker.add(() => {
  t = Date.now();
  dt = (t - priorTicks) / 1000;
  priorTicks = t;

  console.log(dt);
  // Update the sprite's position
  if (controller.wPressed  && vy === 0 ) {//&& sprite.y >= app.screen.height - sprite.height
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
  else {
    // Apply gravity to simulate falling
    vy += g;
  }

      //  // Check for collision
      //   if (isCollision(sprite, platform)) {
      //     // Handle the collision (adjust sprite's position and velocity)
      //     handleCollision(sprite, platform);
  //   }

  //this kinda works
  //  // Check for collision
  // if (isCollision(sprite, platform)) {
  //   // Handle the collision (adjust sprite's position and velocity)
  //   handleCollision(sprite, platform, originalCharacterY); // originalCharacterY
  // }
      

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
//this kinda works
//    // Function to check for collision between two sprites
//       function isCollision(sprite, platform) {
//         return (// if velocity is + then its falling down
//           // if the top of the platform is touching the bottom of the sprite
//           sprite.x < platform.x + platform.width &&
//           sprite.x + sprite.width > platform.x &&
//           sprite.y < platform.y + platform.height &&
//           sprite.y + sprite.height > platform.y
//         );
//       }

//       // Function to handle the collision
//       function handleCollision(sprite, platform) {
//         // Adjust the sprite's position and velocity based on the collision
//        sprite.y = platform.y - sprite.height; // Align sprite with the top of the platform
//        vy = 0; // Reset vertical velocity when touching the platform
//       }
//  // Function to handle the collision
// //   function handleCollision(sprite, platform) { // originalY
// //     // Check the direction of the sprite's velocity
// //     if (vy > 0) {
// //       // If velocity is positive, it's moving downward (falling)
// //     //sprite.y = platform.y - sprite.height; // Align sprite with the top of the platform
// //        vy = -jumpSpeed; 
// //       vy = 0; // Reset vertical velocity when touching the platform
// //     } else if (vy < 0) {
// //       // If velocity is negative, it's moving upward (jumping)
// //       sprite.y = platform.y + platform.height; // Align sprite with the bottom of the platform
// //       vy = 0; // Reset vertical velocity when touching the platform
// //     // } else {
// //     //   // If vy is 0, the sprite is neither jumping nor falling vertically
// //     //   // Adjust the sprite's position based on the original starting position
// //     //   //sprite.y = originalY;
// //     }
// // }
//  // Function to handle the collision
// function handleCollision(sprite, platform, originalCharacterY) {
//   // Check if the character is already in the air
//   if (sprite.y < platform.y + platform.height) {
//     vy = -jumpSpeed; // going up is negative velocity, going down is positive
//     // If the character is in the air, set vy to 0 to allow movement and prevent sticking to the platform
//     vy = 0;
//   //sprite.y = platform.y - sprite.height;
   
//   } else {
//     // If the character is on the platform, adjust the position and velocity based on the collision
//    sprite.y = platform.y - sprite.height; // Align sprite with the top of the platform
//     vy = 0; // Reset vertical velocity when touching the platform
//   }
// }

