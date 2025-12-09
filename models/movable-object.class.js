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
    this.lastMove = new Date().getTime();
  }

  moveRight() {
    this.x += this.speed;
    this.lastMove = new Date().getTime();
  }

  jump() {
    this.speedY = 22;
    this.lastMove = new Date().getTime();
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

  hit(damage = 5) {
    if (this.isHurt()) return;
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
    console.log("ENERGY=", this.energy);
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
