class People {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    display(x, z) {
        threed.push();
        threed.translate(x, 0, z)
        threed.cone(this.width-0.5, this.height);
        threed.rotateZ(180);
        threed.cone(this.width+1.5, this.height);
        threed.pop();
    }
}
