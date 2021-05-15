let buildings = [];
let people = [];
let moons = [];
var myAsciiArt;
var ascii_arr;
let threed;
let population = 0;

let skyTexture;
let buildingTexture;
let groundTexture;

function setup() {

    var canvasDiv = document.getElementById('canvasContainer');
    var divWidth = canvasDiv.offsetWidth - 30;
    var canvas = createCanvas(divWidth, divWidth);
    canvas.parent("canvasContainer");

    twod = createGraphics(divWidth, divWidth);
    threed = createGraphics(70, 70, WEBGL);
    myAsciiArt = new AsciiArt(this);

    threed.angleMode(DEGREES);

    for (let i = 0; i < 5; i++) {
        buildings[i] = new Building(30, random(0, 2));
    }
    for (let i = 0; i < 1; i++) {
        people[i] = new People(1, 15);
    }
    moons[0] = new Moon(random(100, 400), random(-120, -50), random(-400, -100), random(5, 20));
    moons[1] = new Moon(random(100, 400), random(-120, -50), random(-400, -100), random(40, 50));

    control();
    namePlanet();

    displayScene(1);
}

function control() {

    // let progressButton = select("#progressButton");
    // progressButton.mousePressed(displayScene);

    let choice1 = select("#choice1");
    choice1.mousePressed(displayScene);
    let choice2 = select("#choice2");
    choice2.mousePressed(displayScene);
}

function namePlanet() {

    let chars = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let name = "x" + random(chars) + random(chars) + random(chars) + random(chars) + random(chars) + random(chars);

    select("#planetName").html(name);
}

function displayScene(frame) {

    twod.clear();
    threed.clear();
    background("#DAB4B4");

    threed.push();
    threed.background(170, 100, 170);

    threed.pointLight(250, 0, 250, 50, -50, 10);
    threed.ambientLight(0, 99, 104);

    threed.noStroke();

    threed.push();
    threed.translate(0, -180, -500);
    threed.texture(skyTexture);
    threed.plane(700, 300);
    threed.pop();

    threed.rotateX(84);
    threed.push();
    threed.rotateZ(0);
    threed.texture(groundTexture);
    threed.plane(200, 200);
    threed.pop();
    threed.rotateX(-90);
    threed.rotateY(45);
    threed.translate(10, 0, -10);

    let streetWidth = 50;

    if (frame != 1) {
        buildings[0].display(0, 0);
        buildings[1].display(-streetWidth, 0);
        buildings[2].display(0, streetWidth);
        buildings[3].display(0, -streetWidth);
        buildings[4].display(streetWidth, 0);
    }

    for (let i = 0; i < 5; i++) {
        buildings[i].height += 1;
    }

    for (let i = 0; i < moons.length; i++) {
        moons[i].display();
    }
    let distance = 45;

    for (let i = 0; i < population; i++) {
        people[0].display(random(-distance, distance), random(-distance, distance));
    }
    population += 1;

    threed.pop();
    image(threed, 0, 0, height, height);

    twod.background(0, 99, 104, 100);

    twod.textAlign(CENTER, CENTER);
    twod.textFont('Courier', 10/703*height);
    twod.textStyle(NORMAL);
    twod.noStroke();
    twod.fill(255, 222, 221);

    ascii_arr = myAsciiArt.convert(threed);
    myAsciiArt.typeArray2d(ascii_arr, twod);
    image(twod, 0, 0, height, height);
}
