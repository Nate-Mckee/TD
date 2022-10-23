import "phaser";

export default class Platforms extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
    // this.scene.add.existing(this);
    this.create(400, 568, "ground").setScale(2).refreshBody();
    this.create(600, 400, "ground");
    this.create(50, 250, "ground");
    this.create(750, 220, "ground");
  }
}
