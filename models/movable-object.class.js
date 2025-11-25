class MovableObject {
  x = 40;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageChache = [];
  currentImage = 0;
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 125;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageChache[path] = img;
    });
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  moveRight() {
    console.log("Moving right");
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // % = Modulo-Operator
    // i = 0, dann 1, dann 2 ... dann 5, dann wieder 0
    let path = images[i];
    this.img = this.imageChache[path];
    this.currentImage++;
  }
}
