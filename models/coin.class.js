class Coin extends CollectableObject {
  height = 55;
  width = 55;

  offset = {
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
  };

  IMAGES_PULSE = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor(imagePath) {
    super(imagePath);
    this.loadImages(this.IMAGES_PULSE);
    this.x = 100 + Math.random() * 2000;
    this.y = 150 + Math.random() * 175;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_PULSE);
    }, 300);
  }
}
