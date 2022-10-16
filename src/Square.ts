export default class Square {
    private gameObject: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
    create(scene, graphics) {
        this.gameObject = scene.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as any;
        scene.physics.add.existing(this.gameObject);
    }
    update(scene) {
        const cursorKeys = scene.input.keyboard.createCursorKeys();

        if (cursorKeys.up.isDown) {
            this.gameObject.body.setVelocityY(-500);
        } else if (cursorKeys.down.isDown) {
            this.gameObject.body.setVelocityY(500);
        } else {
            this.gameObject.body.setVelocityY(0);
        }

        if (cursorKeys.right.isDown) {
            this.gameObject.body.setVelocityX(500);
        } else if (cursorKeys.left.isDown) {
            this.gameObject.body.setVelocityX(-500);
        } else {
            this.gameObject.body.setVelocityX(0);
        }
    }
}