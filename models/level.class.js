class Level {
  coins;
  bottles;
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 2250;

  constructor(coins, bottles, enemies, clouds, backgroundObjects) {
    this.coins = coins;
    this.bottles = bottles;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
