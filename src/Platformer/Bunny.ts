import "phaser";

const BUNNY = "bunny";
export default class Player extends Phaser.Physics.Arcade.Sprite {
  static preload(scene: Phaser.Scene) {
    scene.load.spritesheet(BUNNY, "assets/tilemap.png", {
      frameWidth: 16,
      frameHeight: 16,
      spacing: 1,
    });
  }
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys = null;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
  ) {
    super(scene, x, y, BUNNY);
    this.cursors = cursors;
    scene.add.existing(this);
    this.setScale(1.2);
    scene.physics.add.existing(this);
    this.setBounce(0.6);
    this.setCollideWorldBounds(true);
    this.createAnimations();
    this.anims.play("bunnyright");
    this.anims.pause();
    // this.setDrag(0.9);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-160);
      this.anims.playReverse("bunnyright", true);
      this.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(160);
      this.anims.play("bunnyright", true);
      this.flipX = false;
    } else {
      this.setVelocityX(0);
      this.anims.pause();
    }
    if (this.cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-340);
    }
  }

  die() {
    this.setTint(0xff0000);
    // this.anims.play("turn");
  }

  private createAnimations() {
    this.scene.anims.create({
      key: "bunnyright",
      frames: this.scene.anims.generateFrameNumbers(BUNNY, {
        start: 40,
        end: 42,
      }),
      frameRate: 20,
      repeat: -1,
      showOnStart: true,
    });
  }
}
