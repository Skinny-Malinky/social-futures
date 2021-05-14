class Building {

    constructor(width, height, depth) {
        this.width = width;
        this.height = height;
        this.depth = depth || width;
    }

    display(x, z) {
        threed.push();
        threed.translate(x, 0, z);
        threed.texture(buildingTexture);
        threed.box(this.width, this.height, this.depth);
        threed.pop();
    }
}
