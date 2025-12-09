class CoinBar extends DrawableObject {
  counter = 0;

  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 30;
    this.y = 45;
    this.width = 155;
    this.height = 50;
    this.setCounter(0);
  }

  setCounter(counter) {
    this.counter = counter;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.counter == 9) {
      return 5;
    } else if (this.counter >= 7) {
      return 4;
    } else if (this.counter >= 5) {
      return 3;
    } else if (this.counter >= 3) {
      return 2;
    } else if (this.counter >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
