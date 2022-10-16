import 'phaser';
import Path from './Path';
import Square from './Square';

export default class Demo extends Phaser.Scene {
    path = null;
    square = null;

    constructor() {
        super('demo');
    }

    preload() {
        this.load.image('boat', 'assets/boat/1.png');
        this.load.image('boat2', 'assets/boat/2.png');
    }

    create() {
        const scene = this;
        const graphics = this.add.graphics();
        this.path = new Path();
        this.path.create(scene, graphics);

        this.square = new Square();
        this.square.create(scene, graphics);
    }

    update() {
        this.square.update(this);
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
