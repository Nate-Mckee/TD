const formatScore = (score) => `Score: ${score}`;
const style = { fontSize: "32px", fill: "#000" };

class ScoreLabel extends Phaser.GameObjects.Text {
  private score: Number = 0;

  constructor(scene, x, y) {
    super(scene, x, y, formatScore(0), style);
    this.score = 0;
    scene.add.existing(this);
  }

  add(points) {
    this.score = this.score + points;
    this.setText(formatScore(this.score));
  }
}

export default ScoreLabel;
