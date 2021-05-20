let circles = "circles";
let eldon = "eldon";
let flagbones = "flagbones";
let glass = "glass";
let hair = "hair";
let inverse = "inverse";
let lettermountain = "lettermountain";
let magma = "magma";
let noise = "noise";
let nova = "nova";
let obfusc = "obfusc";
let oceanknit = "oceanknit";
let perlinknit = "perlinknit";
let postit = "postit";
let rainbow = "rainbow";
let reactionknit = "reactionknit";
let retro = "retro";
let roe = "roe";
let sally = "sally";
let scuff = "scuff";
let shard = "shard";
let sky = "sky";
let split = "split";
let straw = "straw";
let tincture = "tincture";
let vines = "vines";

function preload() {

    randomPlanet();
}

function randomPlanet() {

    guideWords = loadJSON("json/guide-words.json")

    let skyTextures = [lettermountain, nova, obfusc, rainbow, retro, sky];
    let buildingTextures = [circles, eldon, glass, inverse, magma, noise, nova, obfusc, perlinknit, postit, reactionknit, retro, roe, shard, sky, split, tincture];
    let groundTextures = [circles, flagbones, glass, hair, magma, oceanknit, perlinknit, reactionknit, sally, scuff, shard, sky, straw, vines];

    skyTexture = loadImage("textures/" + random(skyTextures) + ".jpg");
    buildingTexture = loadImage("textures/" + random(buildingTextures) + ".jpg");
    groundTexture = loadImage("textures/" + random(groundTextures) + ".jpg");
}
