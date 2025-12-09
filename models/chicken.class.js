class Chicken extends MovableObject {
  y = 370;
  height = 55;
  width = 55;

  offset = {
    top: 13,
    right: 5,
    bottom: 10,
    left: 5,
  };

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 200 + Math.random() * 2500;
    this.speed = 0.25 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isDead()) this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }

  die() {
    this.energy = 0;
    // stop movement
    this.speed = 0;
    // show dead image immediately
    this.loadImage(this.IMAGES_DEAD[0]);

    // remove from world after delay (if world reference exists)
    setTimeout(() => {
      if (this.world && this.world.level && this.world.level.enemies) {
        let i = this.world.level.enemies.indexOf(this);
        if (i !== -1) this.world.level.enemies.splice(i, 1);
      }
    }, 300);
  }
}
