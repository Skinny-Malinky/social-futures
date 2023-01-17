let moons = [];
let buildings = [];
let trees = [];
let people;
let drones;
let dogs;

let scenarioElement;
let choice1Element;
let choice2Element;
let choice3Element;
let currentEvent;

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

let earlyWhale;
let midyWhale;
let lateWhale;
let arc;
let planet;
let earlyWhaleCards;
let midWhaleCards;
let lateWhaleCards;
let arcCards;
let planetCards;
let gameStage = 1;
// GameStage enum: 
    // 1. Arc Cards 
    // 2. Planet Card 
    // 3. Whale World

let outcomeText = "";

let startButton;
let eventsContainer;
let planetView;

let stats = {
    fulfilment: 5,
    health: 5,
    community: 0,
    education: 5,
    equality: 5,
    wealth: 0,
    biodiversity: 20
};

let colors = ["#78A630", "#419F66", "#3EA0B1", "#6090D5", "#9277DE", "#B865D7", "#D763AF", "#DA7E77", "#D39C56", "#A8A8A8"];
let color;

let fonts = ["Berkshire Swash", "Audiowide", "Rye", "Racing Sans One", "Oxanium"];
let font;

function setup() {

    scenarioElement = select("#scenario");
    choice1Element = select("#choice1");
    choice2Element = select("#choice2");
    choice3Element = select("#choice3");

    var canvasDiv = document.getElementById('canvasContainer');
    startButton = document.getElementById('begin');
    eventsContainer = document.getElementById('eventsContainer');
    planetView = document.getElementById('planetViewContainer');

    var divWidth = canvasDiv.offsetWidth
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
    namePlanet();
    // randomiseStats();
    
    arc = eventsJson.arc
    planet = eventsJson.planet
    earlyWhale = eventsJson.earlyWhale
    midWhale = eventsJson.midWhale
    lateWhale = eventsJson.lateWhale
    arcCards = arc.cards;
    planetCards = planet.cards;
    earlyWhaleCards = earlyWhale.cards;
    midWhaleCards = midWhale.cards;
    lateWhaleCards = lateWhale.cards;
    displayEvent(random(arcCards));
    
    // Testing only
    // showPlanetView();
}

function showPlanetView() {
    //This has to happen to see the canvas
    displayScene(0);
    displayStats();
    moveWindow('-200vw');
}
function moveWindow(distance) {
    eventsContainer.style.transform = 'translateX(' + distance + ')';
}

function control() {
    let bolds = selectAll("b");
    for (let i = 0; i < bolds.length; i++) {
        bolds[i].style("font-family", font);
    }
}

function controlChoices(event) {
    choice1Element.mousePressed(() => {
        displayScene();
        updateStats(event.choices[0].stats);
        displayEvent(getNextEvent(event));
    });
    choice2Element.mousePressed(() => {
        displayScene();
        updateStats(event.choices[1].stats);
        displayEvent(getNextEvent(event));
    });
    choice3Element.mousePressed(() => {
        displayScene();
        updateStats(event.choices[2].stats);
        displayEvent(getNextEvent(event));
    });
}

let stageIterator = 0;
let numberOfScenes = 0;
function getNextEvent() {
    console.log(stageIterator + ' ' + numberOfScenes);
    if(stageIterator == numberOfScenes){
        gameStage++;
        stageIterator = 0;
        console.log(stageIterator + ' ' + numberOfScenes + ' ' + gameStage);
    }
    if(gameStage == 1) {
        numberOfScenes = arc.numberOfScenes;
        // console.log(stageIterator + ' ' + numberOfScenes);
        stageIterator++;
        return arcCards[0];
    }
    else if(gameStage == 2) {
        numberOfScenes = planet.numberOfScenes;
        // console.log(stageIterator + ' ' + numberOfScenes);
        stageIterator++;
        return planetCards[0];
    }
    else if(gameStage == 3) {
        numberOfScenes = earlyWhale.numberOfScenes;
        let whaleCard = random(earlyWhaleCards);
        earlyWhaleCards = earlyWhaleCards.filter(unusedCard => unusedCard != whaleCard);
        // console.log(stageIterator + ' ' + numberOfScenes);
        stageIterator++;
        return whaleCard;
    }
    else if(gameStage == 4) {
        numberOfScenes = midWhale.numberOfScenes;
        let whaleCard = random(midWhaleCards);
        midWhaleCards = midWhaleCards.filter(unusedCard => unusedCard != whaleCard);
        // console.log(stageIterator + ' ' + numberOfScenes);
        stageIterator++;
        return whaleCard;
    }
    else if(gameStage == 5) {
        numberOfScenes = lateWhale.numberOfScenes;
        let whaleCard = random(lateWhaleCards);
        lateWhaleCards = lateWhaleCards.filter(unusedCard => unusedCard != whaleCard);
        // console.log(stageIterator + ' ' + numberOfScenes);
        stageIterator++;
        return whaleCard;
    }
}

function displayEvent(event) {
    // console.log(event);
    scenarioElement.html(outcomeText + event.scenario);
    choice1Element.html("1. " + event.choices[0].choice);
    if (event.choices[1]) {
        choice2Element.html("2. " + event.choices[1].choice);
    } else {
        choice2Element.html("");
    }
    if (event.choices[2]) {
        choice3Element.html("3. " + event.choices[2].choice);
    } else {
        choice3Element.html("");
    }
    controlChoices(event);
}



function displayStats() {
    select("#fulfilment").html(numberToBar(stats.fulfilment));
    select("#health").html(numberToBar(stats.health));
    select("#community").html(numberToBar(stats.community));
    select("#education").html(numberToBar(stats.education));
    select("#equality").html(numberToBar(stats.equality));
    select("#wealth").html(numberToBar(stats.wealth));
    select("#biodiversity").html(numberToBar(stats.biodiversity));
}

function numberToBar(n) {
    let total = 20;
    let bar = "";
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
        if (stats[i] > 20) {
            stats[i] = 20;
        }
    }
    displayStats();
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
        stats[i] = int(random(20));
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

// Events
startButton.addEventListener('onClick', showPlanetView);