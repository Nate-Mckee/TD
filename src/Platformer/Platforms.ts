import "phaser";

const GROUND = "ground";
export default class Platforms extends Phaser.Physics.Arcade.StaticGroup {
  static preload(scene: Phaser.Scene) {
    scene.load.image(GROUND, "assets/platform.png");
  }

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
    this.create(400, 568, GROUND).setScale(2).refreshBody();
    this.create(600, 400, GROUND);
    this.create(50, 250, GROUND);
    this.create(750, 220, GROUND);
  }
}
