import "phaser";
import ScoreLabel from "./ScoreLabel";
import BombGroup from "./BombGroup";
import Player from "./Player";
import StarGroup from "./StarGroup";
import Platforms from "./Platforms";
import Background from "./Background";

export default class Platformer extends Phaser.Scene {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys = null;
  private gameOver = false;

  private background: Background = null;
  private platforms: Platforms = null;
  private player?: Player = null;
  private bombs: BombGroup = null;
  private stars: StarGroup = null;
  private scoreLabel: ScoreLabel = null;

  constructor() {
    super("platformer");
  }

  preload() {
    Background.preload(this);
    Platforms.preload(this);
    StarGroup.preload(this);
    BombGroup.preload(this);
    Player.preload(this);
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.background = new Background(this);
    this.scoreLabel = new ScoreLabel(this, 16, 16);
    this.platforms = new Platforms(this);
    this.player = new Player(this, 100, 450, this.cursors);
    this.bombs = new BombGroup(this);
    this.stars = new StarGroup(this, {
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(
      this.player,
      this.bombs,
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
    this.bombs.spawn(player.x);
  }

  update() {
    if (this.gameOver) return;

    this.player.update();
  }
}
