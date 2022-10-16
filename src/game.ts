import 'phaser';

export default class Demo extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };

    constructor() {
        super('demo');
    }

    preload() {
        this.load.image('boat', 'assets/boat/1.png');
        this.load.image('boat2', 'assets/boat/2.png');
    }

    create() {
        const graphics = this.add.graphics();
        const path = this.add.path(96, -32);

        path.lineTo(96, 164);
        path.lineTo(480, 164);
        path.lineTo(480, 632);

        graphics.lineStyle(3, 0xffffff, 1);
        path.draw(graphics);

        this.square = this.add.rectangle(400, 400, 100, 100, 0xFFFFFF) as any;
        this.physics.add.existing(this.square);
    }

    update() {
        const cursorKeys = this.input.keyboard.createCursorKeys();

        if (cursorKeys.up.isDown) {
            this.square.body.setVelocityY(-500);
        } else if (cursorKeys.down.isDown) {
            this.square.body.setVelocityY(500);
        } else {
            this.square.body.setVelocityY(0);
        }

        if (cursorKeys.right.isDown) {
            this.square.body.setVelocityX(500);
        } else if (cursorKeys.left.isDown) {
            this.square.body.setVelocityX(-500);
        } else {
            this.square.body.setVelocityX(0);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Demo,
    scale: {
        width: window.innerWidth,
        height: window.innerHeight,
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
};

const game = new Phaser.Game(config);
