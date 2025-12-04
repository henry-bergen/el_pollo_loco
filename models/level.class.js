class Level {
  collectables;
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 2250;

  constructor(collectables, enemies, clouds, backgroundObjects) {
    this.collectables = collectables;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
