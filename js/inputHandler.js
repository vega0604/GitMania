
var controller = new Controller();

window.addEventListener("keydown", (e) => {
  controller.press(e.key);
  console.log(e.key + " pressed");
})

window.addEventListener("keyup", (e) => {
  controller.release(e.key);
  console.log(e.key + " released");
})


// window.addEventListener("mousemove", MovePlatform);

