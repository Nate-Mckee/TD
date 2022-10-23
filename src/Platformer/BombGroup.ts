import "phaser";

const BOMB = "bomb";
export default class BombGroup extends Phaser.Physics.Arcade.Group {
  static preload(scene: Phaser.Scene) {
    scene.load.image(BOMB, "assets/bomb.png");
  }
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
  }

  spawn(playerX: number) {
    const x =
      playerX < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    const bomb = this.create(x, 16, BOMB);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}
