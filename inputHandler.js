  // Example: Add keyboard input to move the sprite
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      sprite.x += 40 ;
    }
  });
//ignore
//   window.addEventListener("keydown", (e) => {
//     if (e.key === "ArrowUp") {
//       sprite.y += -10;
//     }
//   });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      sprite.y += 30 ;
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      sprite.x += -40 ;
    }
  });

       window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" && sprite.y >= app.screen.height - sprite.height) {
          // Only jump if the sprite is on the ground (at the bottom)
          vy = -20 ; // Adjust the jump strength as needed
        }
      });

