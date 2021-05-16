class Dog {

    constructor() {

    }

    display(x, z) {

        threed.push();
        threed.rotateY(45);
        threed.translate(x, -1, z);
        threed.rotateY(random(360));
        threed.cylinder(1, 0.5);
        threed.pop();
    }
}
