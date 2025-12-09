class Level {
  coins;
  bottles;
  enemies;
  clouds;
  backgroundObjects;
  endboss;

  level_end_x = 2500;

  constructor(coins, bottles, enemies, clouds, backgroundObjects) {
    this.coins = coins;
    this.bottles = bottles;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    // extract endboss from enemies for easy access
    this.endboss = enemies.find((enemy) => enemy instanceof Endboss);
  }
}
