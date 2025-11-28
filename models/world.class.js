class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
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
  }

  run() {
    setInterval(() => {
      this.checkThrowObjects();
      this.checkCollisions();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.G) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        console.log("Collision with enemy! Energy =", this.character.energy);
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }

      // // landed on enemy from above -> enemy dies (handles stop, dead-image and removal)
      // enemy.die();
      // } else {
      // // side or other collision -> only hurt the character if enemy isn't already dead
      // if (!enemy.isDead) {
      //   console.log("Collision with enemy! Energy =", this.character.energy);
      //   this.character.hit();
      //   this.statusBar.setPercentage(this.character.energy);
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
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
