import "phaser";
import ScoreLabel from "./ScoreLabel";
import BombSpawner from "./BombSpawner";
import Player from "./Player";
import StarGroup from "./StarGroup";
import Platforms from "./Platforms";

export default class Platformer extends Phaser.Scene {
  private player?: Player = null;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys = null;
  private scoreLabel: ScoreLabel = null;
  private bombSpawner: BombSpawner = null;
  private stars: StarGroup = null;
  private platforms: Platforms = null;
  private gameOver = false;

  constructor() {
    super("platformer");
  }

  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");

    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(400, 300, "sky");

    this.platforms = new Platforms(this);
    this.player = new Player(this, 100, 450, "dude", this.cursors);
    this.stars = new StarGroup(this, {
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    //TODO: Make this a proper group via inheritance.
    this.bombSpawner = new BombSpawner(this, "bomb");
    const bombsGroup = this.bombSpawner.group;

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(bombsGroup, this.platforms);
    this.physics.add.collider(
      this.player,
      bombsGroup,
      this.hitBomb,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );

    this.scoreLabel = new ScoreLabel(this, 16, 16);
  }

  hitBomb() {
    this.physics.pause();
    this.player.die();
    this.gameOver = true;
  }
  collectStar(
    player: Phaser.Physics.Arcade.Sprite,
    star: Phaser.Physics.Arcade.Sprite
  ) {
    star.disableBody(true, true);
    this.scoreLabel.add(10);
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child: Phaser.Physics.Arcade.Sprite) => {
        child.enableBody(true, child.x, 0, true, true);
      });
    }
    this.bombSpawner.spawn(player.x);
  }

  update() {
    if (this.gameOver) return;

    this.player.update();
  }
}
