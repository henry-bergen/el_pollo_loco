class Bottle extends CollectableObject {
  height = 75;
  width = 100;

  offset = {
    top: 15,
    right: 45,
    bottom: 10,
    left: 55,
  };

  constructor(imagePath) {
    super(imagePath);
    this.x = 100 + Math.random() * 2000;
    this.y = 375;
  }
}
