class Moon {

    constructor(x, y, z, size) {

        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
    }

    display() {

        threed.push();
        threed.translate(this.x, this.y, this.z);
        threed.emissiveMaterial("#086371");
        threed.sphere(this.size);
        threed.pop();
    }
}
