class CollectableObject extends DrawableObject {
  height = 35;
  width = 35;

  offset = {
    top: 5,
    right: 7,
    bottom: 10,
    left: 5,
  };

  constructor(imagePath) {
    super().loadImage(imagePath);
    this.x = 200 + Math.random() * 2500;
    this.y = 400;
  }
}
