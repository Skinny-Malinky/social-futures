class People {

    constructor() {

    }

    display(x, z) {

        let width = 1;
        let height = 15;

        if (round(random(4)) == 0) {
            height /= 2;
        }
        threed.push();
        threed.rotateY(45);
        threed.translate(x, 0, z);
        threed.cone(width-0.5, height);
        threed.rotateZ(180);
        threed.cone(width+1.5, height);
        threed.pop();
    }
}
