let stars = [];
let moons = [];
let buildings = [];
let trees = [];
let people;
let drones;
let dogs;

let population = 0;
let dronePopulation = 0;
let dogPopulation = 0;

let year = 0;

var myAsciiArt;
var ascii_arr;
let twod;
let threed;

let skyTexture;
let buildingTexture;
let groundTexture;

let guideWords;

function setup() {

    var canvasDiv = document.getElementById('canvasContainer');
    var divWidth = canvasDiv.offsetWidth - 30;
    var canvas = createCanvas(divWidth, divWidth);
    canvas.parent("canvasContainer");

    twod = createGraphics(divWidth, divWidth);
    threed = createGraphics(70, 70, WEBGL);
    myAsciiArt = new AsciiArt(this);

    threed.angleMode(DEGREES);

    let buildingShape = random(["box", "cylinder", "flute", "cone", "ellipsoid"]);
    for (let i = 0; i < 10; i++) {
        buildings[i] = new Building(30, 0, buildingShape, random(-20, 150), random(-100, 100));
    }
    for (let i = 0; i < random(0, 180); i++) {
        trees[i] = new Tree(random(-40, 450), random(2), random(-100, 100));
    }
    people = new People();
    drones = new Drone();
    dogs = new Dog();

    for (let i = 0; i < 400; i++) {
        stars[i] = new Star(450, random(-300, 0), random(-300, 300), random(1, 1));
    }
    moons[0] = new Moon(400, random(-120, -200), random(-200, 200), random(5, 20));
    moons[1] = new Moon(400, random(-120, -200), random(-200, 200), random(30, 60));

    control();
    namePlanet();

    displayScene(0);
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

    const distance = Math.floor(Math.random() * 23) + 8;
    const length = guideWords.words.length - distance - 1;
    const place = Math.floor(Math.random() * length);

    const prefix = guideWords.words[place];
    const suffix = guideWords.words[place + distance];

    let name = [prefix, suffix].join("");
    name = name.replace(/^\w/, (c) => c.toUpperCase());

    select("#planetName").html(name);
}

function displayScene(frame) {

    twod.clear();
    threed.clear();

    threed.push();

    threed.background("#AA64AA");

    threed.pointLight(250, 0, 250, 50, -50, 10);
    threed.ambientLight("#006368");

    threed.noStroke();

    threed.push();
    threed.translate(0, -180, -500);
    threed.texture(skyTexture);
    threed.plane(700, 300);
    threed.pop();

    threed.rotateX(84);
    threed.push();
    threed.texture(groundTexture);
    threed.plane(200, 200);
    threed.pop();
    threed.rotateX(-90);
    threed.rotateY(45);
    threed.translate(10, 0, -10);

    let streetWidth = 50;

    // if (frame != 0) {
    //     buildings[0].display(0, 0);
    //     buildings[1].display(-streetWidth, 0);
    //     buildings[2].display(0, streetWidth);
    //     buildings[3].display(0, -streetWidth);
    //     buildings[4].display(streetWidth, 0);
    // }

    if (frame != 0) {
        for (let i = 0; i < buildings.length; i++) {
            buildings[i].display();
        }
    }

    for (let i = 0; i < buildings.length; i++) {
        buildings[i].height += 1;
    }
    for (let i = 0; i < trees.length; i++) {
        trees[i].display();
    }
    // for (let i = 0; i < stars.length; i++) {
    //     stars[i].display();
    // }
    for (let i = 0; i < moons.length; i++) {
        moons[i].display();
    }
    for (let i = 0; i < population; i++) {
        people.display(random(-60, 60), random(-60, 60));
    }
    for (let i = 0; i < dronePopulation; i++) {
        drones.display(random(-70, 70), random(10), random(-70, 70));
    }
    for (let i = 0; i < dogPopulation; i++) {
        dogs.display(random(-70, 70), random(-70, 70));
    }
    threed.pop();

    if (year % 10 == 5) {
        dronePopulation++;
        dogPopulation += 0.5;
    }
    population++;
    year++;

    render();
}

function render() {
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
