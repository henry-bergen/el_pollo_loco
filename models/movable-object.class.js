class MovableObject {
  x = 40;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageChache = [];
  currentImage = 0;
  speed = 0.2;

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
}
