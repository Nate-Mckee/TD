import "phaser";

const SKY = "sky";

export default class Background extends Phaser.GameObjects.Group {
  static preload(scene: Phaser.Scene) {
    scene.load.image(SKY, "assets/sky.png");
  }

  constructor(scene: Phaser.Scene) {
    super(scene);
    scene.add.image(400, 300, SKY);
  }
}
