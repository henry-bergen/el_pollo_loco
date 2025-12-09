class CollectableObject extends DrawableObject {
  height = 35;
  width = 35;

  offset = {
    top: 5,
    right: 7,
    bottom: 10,
    left: 5,
  };

  collected = false;

  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = 250 + Math.random() * 2500;
    this.y = 400;
  }

  //   collect() {
  //     if (!this.collected) {
  //       this.collected = true;
  //       this.animationFinished = true;
  //       this.loadImage(this.img.src);
  //     }
  //   }

  //   isCollected() {
  //     return this.collected;
  //   }
}
