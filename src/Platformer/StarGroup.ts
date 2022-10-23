import "phaser";

export default class StarGroup extends Phaser.Physics.Arcade.Group {
  constructor(
    scene: Phaser.Scene,
    groupConfig: Phaser.Types.GameObjects.Group.GroupCreateConfig
  ) {
    super(scene.physics.world, scene, groupConfig);
    this.children.iterate((child: Phaser.Physics.Arcade.Sprite) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  }
}
