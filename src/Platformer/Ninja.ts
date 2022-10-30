import "phaser";

const NINJA = "ninja";
export default class Ninja extends Phaser.Physics.Arcade.Sprite {
  static preload(scene: Phaser.Scene) {
    scene.load.spritesheet(NINJA, "assets/ninja-100.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
  }
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys = null;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
  ) {
    super(scene, x, y, NINJA);
    this.cursors = cursors;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    this.createAnimations();
    this.anims.play("ninja-idle");
    this.body.setSize(40, 60);
    this.body.setOffset(30, 25);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-180);
      this.anims.play("ninja-run", true);
      this.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(180);
      this.anims.play("ninja-run", true);
      this.flipX = false;
    } else {
      this.setVelocityX(0);
      this.anims.play("ninja-idle", true);
    }
    if (this.cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-330);
    }
  }

  die() {
    this.setTint(0xffffff);
    this.anims.play("ninja-die");
  }

  private createAnimations() {
    this.scene.anims.create({
      key: "ninja-run",
      frames: this.scene.anims.generateFrameNumbers(NINJA, {
        start: 20,
        end: 31,
      }),
      frameRate: 40,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "ninja-idle",
      frames: this.scene.anims.generateFrameNumbers(NINJA, {
        start: 0,
        end: 19,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "ninja-die",
      frames: this.scene.anims.generateFrameNumbers(NINJA, {
        start: 68,
        end: 72,
      }),
      frameRate: 20,
      repeat: 0,
    });

    // this.scene.anims.create({
    //   key: "ninja-right",
    //   frames: this.scene.anims.generateFrameNumbers(NINJA, {
    //     start: 5,
    //     end: 8,
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
  }
}
