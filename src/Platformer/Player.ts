import "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private key: string = null;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys = null;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
  ) {
    super(scene, x, y, key);
    this.key = key;
    this.cursors = cursors;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.createAnimations();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-160);
      this.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(160);
      this.anims.play("right", true);
    } else {
      this.setVelocityX(0);
      this.anims.playReverse("turn");
    }
    if (this.cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-330);
    }
  }

  die() {
    this.setTint(0xff0000);
    this.anims.play("turn");
  }

  createAnimations() {
    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers(this.key, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "turn",
      frames: [{ key: this.key, frame: 4 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers(this.key, {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
