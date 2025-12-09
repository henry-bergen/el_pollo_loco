class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;

  state = "idle";
  // idle: nur Bild
  // walking: läuft mit Walking-Animation
  // alert: steht und spielt Alert
  // attack: läuft mit Attack-Animation

  offset = {
    top: 100,
    right: 35,
    bottom: 75,
    left: 50,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.speed = 1;
    this.energy = 100;
    this.animate();
  }

  animate() {
    // Haupt-Logik
    setInterval(() => {
      if (!this.world) return;
      let dist = Math.abs(this.x - this.world.character.x);

      switch (this.state) {
        case "idle":
          if (dist < 600) {
            this.state = "walking";
          }
          break;

        case "walking":
          if (dist < 300) {
            this.state = "alert";
            this.alertStartTime = Date.now();
          } else {
            // 🆕 Bewegung nur wenn keine Berührung
            if (this.x > this.world.character.x) this.moveLeft();
          }
          break;

        case "alert":
          const alertDuration = this.IMAGES_ALERT.length * 150;
          if (Date.now() - this.alertStartTime > alertDuration) {
            this.state = "attack";
          }
          break;

        case "attack":
          // 🆕 Bewegung nur wenn keine Berührung
          if (this.x > this.world.character.x) this.moveLeft();
          break;
      }
    }, 1000 / 60);

    // Animationssteuerung
    setInterval(() => {
      switch (this.state) {
        case "idle":
          this.loadImage(this.IMAGES_WALKING[0]);
          break;
        case "walking":
          this.playAnimation(this.IMAGES_WALKING);
          break;
        case "alert":
          this.playAnimation(this.IMAGES_ALERT);
          break;
        case "attack":
          this.playAnimation(this.IMAGES_ATTACK);
          break;
        case "hurt":
          this.playAnimation(this.IMAGES_HURT);
          break;
        case "dead":
          this.playAnimation(this.IMAGES_DEAD);
          break;
      }
    }, 150);
  }

  hit(damage = 20) {
    if (this.isHurt() || this.isDead()) return;

    super.hit(damage);

    if (this.isDead()) {
      this.state = "dead";
      this.speed = 0;
      // ensure dead animation starts from beginning
      this.currentAnimation = null;

      // remove endboss from level and clear reference after short delay
      setTimeout(() => {
        if (this.world && this.world.level && this.world.level.enemies) {
          let i = this.world.level.enemies.indexOf(this);
          if (i !== -1) this.world.level.enemies.splice(i, 1);
        }
        if (this.world && this.world.level) {
          this.world.level.endboss = null;
        }
      }, 1000);
    } else {
      this.state = "hurt";
      this.hurtStartTime = Date.now();
    }
  }
}
