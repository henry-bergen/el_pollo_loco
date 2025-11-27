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

  rX;
  rY;
  rW;
  rH;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageChache[path] = img;
    });
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  jump() {
    this.speedY = 22;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // % = Modulo-Operator
    // i = 0, dann 1, dann 2 ... dann 5, dann wieder 0
    let path = images[i];
    this.img = this.imageChache[path];
    this.currentImage++;
  }

  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rW = this.width - this.offset.left - this.offset.right;
    this.rH = this.height - this.offset.top - this.offset.bottom;
  }

  isColliding(mO) {
    return (
      this.rX + this.rW > mO.rX &&
      this.rY + this.rH > mO.rY &&
      this.rX < mO.rX &&
      this.rY < mO.rY + mO.rH
    );
  }

  // if (character.x + character.width > chicken.x &&
  // character.y + character.height > chicken.y &&
  // character.x < chicken.x &&
  // character.y < chicken.y + chicken.height)
}
