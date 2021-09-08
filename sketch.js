let moons = [];
let buildings = [];
let trees = [];
let people;
let drones;
let dogs;

let population = 0;
let dronePopulation = 0;
let dogPopulation = 0;

let year = 2057;
let planetName = "x";

var myAsciiArt;
var ascii_arr;
let twod;
let threed;

let skyTexture;
let buildingTexture;
let groundTexture;

let guideWords;
let eventsJson;

let events = [];
let eventNumber = 0;
let outcomeText = "";

let stats = {
    fulfilment: 0,
    health: 0,
    community: 0,
    education: 0,
    equality: 0,
    wealth: 0,
    biodiversity: 0,
    planet_health: 0
};

let colors = ["#78A630", "#419F66", "#3EA0B1", "#6090D5", "#9277DE", "#B865D7", "#D763AF", "#DA7E77", "#D39C56", "#A8A8A8"];
let color;

let fonts = ["Berkshire Swash", "Audiowide", "Rye", "Racing Sans One", "Oxanium"];
let font;

function setup() {

    var canvasDiv = document.getElementById('canvasContainer');
    var divWidth = canvasDiv.offsetWidth - 30;
    var canvas = createCanvas(divWidth, divWidth);
    canvas.parent("canvasContainer");

    twod = createGraphics(divWidth, divWidth);
    threed = createGraphics(70, 70, WEBGL);
    myAsciiArt = new AsciiArt(this);

    threed.angleMode(DEGREES);

    let buildingShape = random(["box", "flute", "cone", "ellipsoid"]);
    for (let i = 0; i < 10; i++) {
        buildings[i] = new Building(30, 0, buildingShape, random(-20, 150), random(-100, 100));
    }
    for (let i = 0; i < random(0, 180); i++) {
        trees[i] = new Tree(random(-40, 450), random(2), random(-100, 100));
    }
    people = new People();
    drones = new Drone();
    dogs = new Dog();

    moons[0] = new Moon(400, random(-120, -200), random(-200, 200), random(5, 20));
    moons[1] = new Moon(400, random(-120, -200), random(-200, 200), random(30, 60));

    color = random(colors);
    font = random(fonts);

    control();
    controlChoices();
    namePlanet();
    // randomiseStats();

    displayScene(0);
    displayStats();

    let eventsList = eventsJson.events;
    eventsList = shuffle(eventsList);

    for (let i = 0; i < eventsList.length; i++) {

        events[i] = new Event(eventsList[i]);
    }
    for (let i = eventsJson.beginnings.length - 1; i >= 0; i--) {

        events.unshift(new Event(eventsJson.beginnings[i]));
    }
    // events[4].choices[0].choice = namePlanet();
    // events[4].choices[1].choice = namePlanet();
    // events[4].choices[2].choice = namePlanet();

    displayEvent(0, "");
    eventNumber++;
}

function control() {

    let bolds = selectAll("b");
    for (let i = 0; i < bolds.length; i++) {
        bolds[i].style("font-family", font);
    }
}

function controlChoices() {

    select("#choice1").mousePressed(() => {

        displayScene();
        displayEvent(eventNumber, events[eventNumber-1].choices[0].outcome);
        updateStats(events[eventNumber-1].choices[0].stats);
        displayStats();
        eval(events[eventNumber-1].choices[0].eval);

        eventNumber += 1;
    });
    select("#choice2").mousePressed(() => {

        displayScene();
        displayEvent(eventNumber, events[eventNumber-1].choices[1].outcome);
        updateStats(events[eventNumber-1].choices[1].stats);
        displayStats();
        eval(events[eventNumber-1].choices[1].eval);

        eventNumber += 1;
    });
    select("#choice3").mousePressed(() => {

        displayScene();
        displayEvent(eventNumber, events[eventNumber-1].choices[2].outcome);
        updateStats(events[eventNumber-1].choices[2].stats);
        displayStats();
        eval(events[eventNumber-1].choices[2].eval);

        eventNumber += 1;
    });
}

function displayEvent(n, outcomeText) {

    let scenarioElement = select("#scenario");
    let choice1Element = select("#choice1");
    let choice2Element = select("#choice2");
    let choice3Element = select("#choice3");

    if (n == events.length) {

        scenarioElement.html(outcomeText);
        choice1Element.html("");
        choice2Element.html("");
        return;
    }
    scenarioElement.html(outcomeText + events[n].scenario);
    choice1Element.html("1. " + events[n].choices[0].choice);

    if (events[n].choices[1]) {
        choice2Element.html("2. " + events[n].choices[1].choice);
    } else {
        choice2Element.html("");
    }
    if (events[n].choices[2]) {
        choice3Element.html("3. " + events[n].choices[2].choice);
    } else {
        choice3Element.html("");
    }
}

function displayStats() {

    select("#fulfilment").html(numberToBar(stats.fulfilment));
    select("#health").html(numberToBar(stats.health));
    select("#community").html(numberToBar(stats.community));
    select("#education").html(numberToBar(stats.education));
    select("#equality").html(numberToBar(stats.equality));
    select("#wealth").html(numberToBar(stats.wealth));
    select("#biodiversity").html(numberToBar(stats.biodiversity));
    select("#planet_health").html(numberToBar(stats.planet_health));
}

function numberToBar(n) {

    let total = 20;
    let bar = "";

    // n = int(n / 100 * total);

    if (n > total) {
        n = total;
    }
    for (let i = 0; i < n; i++) {
        bar += "█";
    }
    for (let i = n; i < total; i++) {
        bar += "░";
    }
    return bar;
}

function updateStats(input) {

    for (let i in stats) {

        if (input[i]) {
            stats[i] += input[i];
        }
        if (stats[i] < 0) {
            stats[i] = 0;
        }
    }
}

function namePlanet() {

    const prefix = random(guideWords.words);
    const mid = random(guideWords.words)
    const suffix = random(guideWords.words);

    let name = [prefix, mid, suffix].join("");
    name = name.slice(0, random(4, 9));
    name = name.replace(/^\w/, (c) => c.toUpperCase());

    return name;
}

function randomiseStats() {

    for (let i in stats) {
        stats[i] = int(random(100));
    }
}

function displayScene(frame) {

    let yearHtml = select("#year");
    yearHtml.html(year);
    select("#planetName").html(planetName);


    twod.clear();
    threed.clear();

    threed.push();

    threed.background("#AA64AA");

    threed.pointLight(150, 150, 150, 50, -50, 10);
    threed.ambientLight(color);

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

    twod.background(104, 104, 104, 100);

    twod.textAlign(CENTER, CENTER);
    twod.textFont('Courier', 10/703*height);
    twod.textStyle(NORMAL);
    twod.noStroke();
    twod.fill(255, 222, 221);

    ascii_arr = myAsciiArt.convert(threed);
    myAsciiArt.typeArray2d(ascii_arr, twod);
    image(twod, 0, 0, height, height);
}
