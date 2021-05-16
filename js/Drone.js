class Drone {

    constructor() {

    }

    display(x, y, z) {

        threed.push();
        threed.rotateY(45);
        threed.translate(x, -10 - y, z);
        threed.rotateX(90);
        threed.torus(2, 0.3);
        threed.torus(1, 0.2);
        threed.pop();
    }
}
