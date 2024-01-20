class Controller{
    constructor(){
      this.wPressed = false;
      this.aPressed = false;
      this.sPressed = false;
      this.dPressed = false;
    }
  
    press(key){
        if (key == "w" || key == "W"){
            this.wPressed = true;
        }
        if (key == "a" || key == "A"){
            this.aPressed = true;
        }
        if (key == "s" || key == "S"){
            this.sPressed = true;
        }
        if (key == "d" || key == "D"){
            this.dPressed = true;
        }
    }
  
    release(key){
        if (key == "w" || key == "W"){
            this.wPressed = false;
        }
        if (key == "a" || key == "A"){
            this.aPressed = false;
        }
        if (key == "s" || key == "S"){
            this.sPressed = false;
        }
        if (key == "d" || key == "D"){
            this.dPressed = false;
        }
    }
  }