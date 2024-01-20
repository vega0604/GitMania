// console.log("Main.js loaded");
//   // Create a Pixi Application
// const app = new PIXI.Application({ width: 2000, height: 1000 });
  
// let x = 0;
// let y = 0;
// let vxl = 0;
// let vXr = 0;
// let vy = 0;



//   // Append the canvas to the HTML body
//   document.body.appendChild(app.view);
//   // Initialize Matter.js
//     // const engine = Matter.Engine.create();
//     // const world = engine.world;


//   // Load an image and create a sprite
//   const sprite = PIXI.Sprite.from("./images/girlStanding.png");

//   //size of sprite
//   sprite.width = 200; //30
//   sprite.height = 200; //700

//   // Set the initial position of the sprite
//   sprite.x = 30; //30
//   sprite.y = 0; //700

//   // Add the sprite to the stage
// app.stage.addChild(sprite);
  


// //   const body = Matter.Bodies.rectangle(sprite.x, sprite.y, sprite.width, sprite.height, { friction: 0.5 });
// // Matter.World.add(world, body);

//   // Set up the game loop
//   app.ticker.add(() => {
//     // Update the sprite's position
//       // Matter.Engine.update(engine);
//       //   sprite.x = body.position.x;
//       //     sprite.y = body.position.y;
//     sprite.x += 0;

//     // If the sprite goes off the screen, reset its position
//     if (sprite.x > app.screen.width) {
//       sprite.x = 30;
//     }

//     // Prevent the sprite from going below the screen
//     if (sprite.y > app.screen.height - sprite.height) {
//       sprite.y = app.screen.height - sprite.height;
//       // Optionally, you can stop the vertical velocity when touching the bottom
//      // Matter.Body.setVelocity(body, { x: 0, y: 0 });
//     }
//   });



//   // var a = 10;

//   // vel += a;
//   // pos += vel;
// //     window.addEventListener("keydown", (e) => {
// //   const forceMagnitude = 0.02; // Adjust this value as needed

// //   switch (e.key) {
// //     case "ArrowRight":
// //       // Apply a force to move right
// //       Matter.Body.applyForce(body, body.position, { x: forceMagnitude, y: 0 });
// //       break;

// //     case "ArrowUp":
// //       // Apply a force to move up
// //       Matter.Body.applyForce(body, body.position, { x: 0, y: -forceMagnitude });
// //       break;

// //     case "ArrowDown":
// //       // Apply a force to move down
// //       Matter.Body.applyForce(body, body.position, { x: 0, y: forceMagnitude });
// //       break;

// //     case "ArrowLeft":
// //       // Apply a force to move left
// //       Matter.Body.applyForce(body, body.position, { x: -forceMagnitude, y: 0 });
// //       break;
// //   }
// // });

//Create a Pixi Application
      const app = new PIXI.Application({ width: 2000, height: 1000 });

      // Append the canvas to the HTML body
      document.body.appendChild(app.view);

      // Load an image and create a sprite
      const sprite = PIXI.Sprite.from("./images/girlStanding.png");

      // Size of sprite
      sprite.width = 200;
      sprite.height = 200;

      // Set the initial position of the sprite
      sprite.x = 30;
      sprite.y = 800;

      // Initial velocity values
      let vy = 0;

      //delta time
            
      //let dt = Date.now();
      
      // Add the sprite to the stage
      app.stage.addChild(sprite);

      // Set up the game loop
app.ticker.add(() => {
       // dt = Date.now() - dt;
        // Update the sprite's position
        sprite.x += 0;

        // Update the sprite's vertical position based on velocity
        sprite.y += vy;

        // If the sprite goes off the screen, reset its position
        if (sprite.x > app.screen.width - sprite.width || sprite.x > app.screen.width - sprite.width) {

          sprite.x = 30;
        }

        // Prevent the sprite from going below the screen
        if (sprite.y > app.screen.height - sprite.height) {
          sprite.y = app.screen.height - sprite.height;
          vy = 0; // Reset vertical velocity when touching the bottom
        } else {
          // Apply gravity to simulate falling
          vy += 1;
        }
  
  
  
      });

      // Handle keyboard input to make the sprite jump
 