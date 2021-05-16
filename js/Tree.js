class Tree {

    constructor(x, height, z) {

        this.x = x;
        this.height = height;
        this.z = z;
    }

    display() {
        threed.push();
        threed.rotateY(45);
        threed.translate(this.x, 0, this.z);
        // threed.normalMaterial();
        threed.fill(200);
        // threed.emissiveMaterial("#006368");
        threed.rotateZ(180);
        threed.cone(3, 35);
        threed.rotateY(45);
        threed.rotateZ(180);
        threed.translate(0, -17 + this.height, 0);
        threed.sphere(4);
        threed.translate(-3, 4, -3);
        threed.sphere(4);
        threed.translate(0, 0, 6);
        threed.sphere(4);
        threed.translate(6, 0, 0);
        threed.sphere(4);
        threed.pop();
    }
}
