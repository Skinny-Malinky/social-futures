class Building {

    constructor(width, height, shape, x, z) {

        this.width = width;
        this.height = height;
        this.shape = shape;
        this.x = x;
        this.z = z;
    }

    display() {

        threed.push();
        threed.rotateY(45);
        threed.translate(this.x, 0, this.z);
        threed.rotateY(45);
        threed.texture(buildingTexture);

        switch (this.shape) {
            case "box":
                threed.box(this.width, this.height, this.width);
                break;
            case "cylinder":
                threed.cylinder(this.width/3*2, this.height);
                break;
            case "flute":
                threed.cone(this.width/3*2, this.height);
                break;
            case "cone":
                threed.rotateZ(180);
                threed.translate(0, this.height/2, 0);
                threed.cone(this.width/3*2, this.height);
                break;
            case "ellipsoid":
                threed.ellipsoid(this.width/3*2, this.height, this.width/3*2);
                break;
        }
        threed.pop();
    }
}
