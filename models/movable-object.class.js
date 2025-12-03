class MovableObject extends DrawableObject {
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

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  jump() {
    this.speedY = 22;
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
    if (this.isHurt()) return;
    this.energy -= 5;
    console.log("ENERGY=", this.energy);
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 100;
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
