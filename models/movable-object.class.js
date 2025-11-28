class MovableObject extends DrawableObject {
  rX;
  rY;
  rW;
  rH;

  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  lastMove = new Date().getTime();

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 125;
    }
  }

  getRealFrame() {
    this.rX = this.x + this.offset.left;
    this.rY = this.y + this.offset.top;
    this.rW = this.width - this.offset.left - this.offset.right;
    this.rH = this.height - this.offset.top - this.offset.bottom;
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
    // Wenn bereits fertig und die aktuellen Images die Dead-Animation sind:
    // if (this.animationFinished && images === this.IMAGES_DEAD) {
    //   return;
    // }

    let i = this.currentImage % images.length; // % = Modulo-Operator
    // i = 0, dann 1, dann 2 ... dann 5, dann wieder 0
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;

    // Dead-Animation soll nur einmal laufen:
    // if (images === this.IMAGES_DEAD && this.currentImage >= images.length) {
    //   this.animationFinished = true;
    // }
  }

  isColliding(mO) {
    this.getRealFrame();
    mO.getRealFrame();
    return (
      this.rX < mO.rX + mO.rW &&
      this.rX + this.rW > mO.rX &&
      this.rY < mO.rY + mO.rH &&
      this.rY + this.rH > mO.rY
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  fellAsleep() {
    let timePassed = new Date().getTime() - this.lastMove;
    timePassed = timePassed / 1000;
    return timePassed > 10;
  }
}
