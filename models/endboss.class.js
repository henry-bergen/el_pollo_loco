class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;

  state = "alert";
  // idle: nur Bild
  // walking: läuft mit Walking-Animation
  // alert: steht und spielt Alert
  // attack: läuft mit Attack-Animation

  offset = {
    top: 70,
    right: 50,
    bottom: 75,
    left: 25,
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
    this.speed = 2.5;
    this.energy = 100;
    this.animate();
  }

  animate() {
    this.alertPlayed = false;
    this.alertActive = false;
    this.activated = false; // 🆕 NEU: wurde der Boss schon ausgelöst?

    setInterval(() => {
      if (!this.world) return;

      let char = this.world.character;
      let dist = Math.abs(this.x - char.x);
      let touchingCharacter = this.isColliding(char);

      // ---------- DEAD ----------
      if (this.energy <= 0) {
        this.state = "dead";
        return;
      }

      // ---------- HURT ----------
      if (this.isHurt()) {
        this.state = "hurt";

        // // Hurt bewegt sich weiter (außer Attack / Dead / Alert)
        // if (!touchingCharacter && !this.alertActive) {
        this.moveLeft();
        // }
        return;
      }

      // ---------- ATTACK ----------
      if (touchingCharacter) {
        this.state = "attack";
        return; // keine Bewegung
      }

      // ---------- AKTIVIERUNG (<600px) ----------
      if (!this.activated && dist < 600) {
        this.activated = true; // 🆕 Nur EINMAL
      }

      // ---------- ALERT (einmalig, <300px) ----------
      if (this.activated && !this.alertPlayed && dist < 250) {
        this.state = "alert";
        this.alertPlayed = true;
        this.alertActive = true;

        const alertDuration = this.IMAGES_ALERT.length * 250;
        setTimeout(() => {
          this.alertActive = false;
        }, alertDuration);

        return;
      }

      // Alert blockiert Bewegung
      if (this.alertActive) {
        this.state = "alert";
        return;
      }

      // ---------- WALKING + Bewegung, wenn aktiviert ----------
      if (this.activated) {
        this.state = "walking";
        this.moveLeft();
        return;
      }

      // ---------- STANDARD WALKING ohne Bewegung ----------
      this.state = "walking";
    }, 1000 / 60);

    // ==================== ANIMATIONEN ====================
    setInterval(() => {
      switch (this.state) {
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
        // if (this.world && this.world.level && this.world.level.enemies) {
        let i = this.world.level.enemies.indexOf(this);
        if (i !== -1) this.world.level.enemies.splice(i, 1);
        // }
        // if (this.world && this.world.level) {
        this.world.level.endboss = null;
        // }
      }, 1000);
    } else {
      this.state = "hurt";
      this.hurtStartTime = Date.now();
    }
  }
}
