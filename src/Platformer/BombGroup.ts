import "phaser";

const BOMB = "bomb";
const EXPLOSION = "explosion";
export default class BombGroup extends Phaser.Physics.Arcade.Group {
  static preload(scene: Phaser.Scene) {
    scene.load.image(BOMB, "assets/bomb.png");
    scene.load.spritesheet(EXPLOSION, "assets/explosion-small.png", {
      frameWidth: 200,
      frameHeight: 200,
    });
  }
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
    this.createAnimations();
  }

  spawn(playerX: number) {
    const x =
      playerX < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
    const bomb: Phaser.Physics.Arcade.Sprite = this.create(x, 16, BOMB);
    bomb.setBounce(Phaser.Math.FloatBetween(0.5, 1.0));
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    this.scene.time.delayedCall(
      Phaser.Math.Between(2000, 3000),
      (finishedBomb: Phaser.Physics.Arcade.Sprite) => {
        const explosion = this.scene.add.sprite(
          finishedBomb.body.x,
          finishedBomb.body.y,
          "explode"
        );
        explosion.setScale(2);
        explosion.anims.play("explode");
        finishedBomb.disableBody(true, true);
        finishedBomb.anims.stop();
      },
      [bomb]
    );
  }

  private createAnimations() {
    this.scene.anims.create({
      key: "explode",
      frames: this.scene.anims.generateFrameNumbers(EXPLOSION, {
        start: 0,
        end: 30,
      }),
      frameRate: 80,
      repeat: 0,
    });
  }
}
