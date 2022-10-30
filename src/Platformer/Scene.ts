import "phaser";
import ScoreLabel from "./ScoreLabel";
import BombGroup from "./BombGroup";
import Dude from "./Dude";
import StarGroup from "./StarGroup";
import Platforms from "./Platforms";
import Background from "./Background";
import Bunny from "./Bunny";
import Ninja from "./Ninja";

export default class Platformer extends Phaser.Scene {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys = null;
  private gameOver = false;

  private background: Background = null;
  private platforms: Platforms = null;
  private dude: Dude = null;
  private bunny: Bunny = null;
  private ninja: Ninja = null;
  private bombs: BombGroup = null;
  private stars: StarGroup = null;
  private scoreLabel: ScoreLabel = null;
  private player1: any = null;

  constructor() {
    super("platformer");
  }

  preload() {
    Background.preload(this);
    Platforms.preload(this);
    StarGroup.preload(this);
    BombGroup.preload(this);
    Bunny.preload(this);
    Ninja.preload(this);
    Dude.preload(this);
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.background = new Background(this);
    this.platforms = new Platforms(this);
    this.bombs = new BombGroup(this);
    this.stars = new StarGroup(this, {
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });
    this.scoreLabel = new ScoreLabel(this, 16, 16);
    this.bunny = new Bunny(this, 200, 450, this.cursors);
    this.ninja = new Ninja(this, 300, 450, this.cursors);
    this.dude = new Dude(this, 100, 450, this.cursors);
    this.player1 = this.ninja;

    this.physics.add.collider(this.dude, this.platforms);
    this.physics.add.collider(this.bunny, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.ninja, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(
      this.player1,
      this.bombs,
      this.hitBomb,
      null,
      this
    );

    this.physics.add.overlap(
      this.player1,
      this.stars,
      this.collectStar,
      null,
      this
    );
  }

  hitBomb() {
    this.physics.pause();
    this.player1.die();
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

    // this.dude.update();
    this.player1.update();
    // this.ninja.update();
  }
}
