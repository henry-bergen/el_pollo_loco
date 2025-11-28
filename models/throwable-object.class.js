class ThrowableObject extends MovableObject {
  offset = {
    top: 50,
    right: 25,
    bottom: 50,
    left: 25,
  };

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      if (character.otherDirection) {
        this.x -= 10; // Character schaut nach links
      } else {
        this.x += 10; // Character schaut nach rechts
      }
    }, 25);
  }
}
