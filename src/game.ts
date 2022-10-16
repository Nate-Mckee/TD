import 'phaser';

export default class Demo extends Phaser.Scene {
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
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Demo
};

const game = new Phaser.Game(config);
