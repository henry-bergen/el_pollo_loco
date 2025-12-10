class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  EndbossBar = new EndbossBar();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;

    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });

    this.level.coins.forEach((coin) => {
      coin.world = this;
    });

    this.level.bottles.forEach((bottle) => {
      bottle.world = this;
    });

    this.throwableObjects.forEach((t) => {
      t.world = this;
    });
  }

  run() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 100);
    setInterval(() => {
      this.checkCollisions();
      this.checkCollections();
      // this.checkBottleHits();
      this.checkEndbossBottleHits();
    }, 1);
  }

  checkThrowObjects() {
    if (this.keyboard.G && this.bottleBar.counter > 0) {
      let spawnX = this.character.otherDirection
        ? this.character.x - 1
        : this.character.x + 100;
      let bottle = new ThrowableObject(
        spawnX,
        this.character.y + 100,
        this.character.otherDirection
      );
      bottle.world = this;
      this.throwableObjects.push(bottle);
      this.bottleBar.setCounter(this.bottleBar.counter - 1);
      this.character.lastMove = new Date().getTime();
      this.keyboard.G = false;
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (
          (enemy instanceof Chicken || enemy instanceof Chick) &&
          this.character.isAboveGround() &&
          this.character.speedY < 0
        ) {
          enemy.die();
        } else if (!enemy.isDead()) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  checkCollections() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(index, 1);
        this.coinBar.setCounter(this.coinBar.counter + 1);
      }
    });

    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(index, 1);
        this.bottleBar.setCounter(this.bottleBar.counter + 1);
      }
    });
  }

  checkEndbossBottleHits() {
    this.throwableObjects.forEach((bottle, index) => {
      if (bottle.isColliding(this.level.endboss)) {
        this.level.endboss.hit(20);
        this.EndbossBar.setPercentage(this.level.endboss.energy);

        // WICHTIG!!
        this.throwableObjects.splice(index, 1);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    // Only show EndbossBar when endboss is close enough
    if (Math.abs(this.level.endboss.x - this.character.x) < 600) {
      this.addToMap(this.EndbossBar);
    }
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.coins);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      // Die draw-Funktion wird durch die requestAnimationFrame-Klammer so oft und schnell pro Sekunde neu aufgerufen, dass es für das menschliche Auge nicht sichtbar ist.
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mO) {
    if (mO.otherDirection) {
      this.flipImage(mO);
    }

    mO.draw(this.ctx);
    mO.drawFrame(this.ctx);

    if (mO.otherDirection) {
      this.flipBackImage(mO);
    }
  }

  flipImage(mO) {
    this.ctx.save();
    this.ctx.translate(mO.width, 0);
    this.ctx.scale(-1, 1);
    mO.x = mO.x * -1;
  }

  flipBackImage(mO) {
    mO.x = mO.x * -1;
    this.ctx.restore();
  }
}
