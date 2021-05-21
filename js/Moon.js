class Moon {

    constructor(x, y, z, size) {

        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
    }

    display() {

        threed.push();
        threed.rotateY(45);
        threed.translate(this.x, this.y, this.z);
        threed.emissiveMaterial(color);
        threed.sphere(this.size);
        threed.pop();
    }
}
