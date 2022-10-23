import "phaser";

const STAR = "star";
export default class StarGroup extends Phaser.Physics.Arcade.Group {
  static preload(scene: Phaser.Scene) {
    scene.load.image(STAR, "assets/star.png");
  }
  constructor(
    scene: Phaser.Scene,
    groupConfig: Phaser.Types.GameObjects.Group.GroupCreateConfig
  ) {
    super(scene.physics.world, scene, { ...groupConfig, key: STAR });
    this.children.iterate((child: Phaser.Physics.Arcade.Sprite) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  }
}
