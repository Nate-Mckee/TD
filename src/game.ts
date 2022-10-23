import "phaser";
import PlatformerScene from "./Platformer/Scene";

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  scene: PlatformerScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
