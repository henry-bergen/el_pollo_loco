class ThrowableObject extends MovableObject {
  offset = {
    top: 50,
    right: 25,
    bottom: 50,
    left: 25,
  };

  constructor(x, y, otherDirection = false) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    // set initial facing for the thrown object (true = left)
    this.otherDirection = otherDirection;
    this.throw();
  }

  throw() {
    this.speedY = 25;
    this.applyGravity();
    setInterval(() => {
      this.x += this.otherDirection ? -10 : 10;
    }, 25);
  }
}
