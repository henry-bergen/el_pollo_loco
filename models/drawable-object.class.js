class DrawableObject {
  x = 40;
  y = 280;
  height = 150;
  width = 100;

  img;
  imageCache = [];
  currentImage = 0;
  currentAnimation = null;
  animationFinished = false;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  rX;
  rY;
  rW;
  rH;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rW = this.width - this.offset.left - this.offset.right;
    this.rH = this.height - this.offset.top - this.offset.bottom;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof CollectableObject ||
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Chick ||
      this instanceof Endboss ||
      this instanceof ThrowableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
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
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    // Wenn Animation wechselt → von vorne starten
    if (this.currentAnimation !== images) {
      this.currentAnimation = images;
      this.currentImage = 0;
      this.animationFinished = false; // wichtig, sonst ist Dead blockiert
    }

    // Dead-Animation nicht erneut starten, wenn fertig
    if (images === this.IMAGES_DEAD && this.animationFinished) {
      return;
    }

    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;

    // Dead-Animation nur einmal
    if (images === this.IMAGES_DEAD && this.currentImage >= images.length) {
      this.animationFinished = true;
    }
  }
}
