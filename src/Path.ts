export default class Path {
    create(scene, graphics) {
        const path = scene.add.path(96, -32);

        path.lineTo(96, 164);
        path.lineTo(480, 164);
        path.lineTo(480, 632);

        graphics.lineStyle(3, 0xffffff, 1);
        path.draw(graphics);
    }
}