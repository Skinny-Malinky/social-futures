let buildings = [];
let people = [];
var myAsciiArt;
var asciiart_width = 120; var asciiart_height = 60;
var ascii_arr;
let threed;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("#CFBBBB");

    twod = createGraphics(windowWidth, windowHeight)
    threed = createGraphics(round(windowWidth/10), round(windowHeight/10), WEBGL);
    myAsciiArt = new AsciiArt(this);

    threed.angleMode(DEGREES);

    for (let i = 0; i < 5; i++) {
        buildings[i] = new Building(30, random(60, 80));
    }
    for (let i = 0; i < 5; i++) {
        people[i] = new People(1, 15);
    }
    // noLoop();
}

function draw() {

    twod.clear();
    threed.clear();
    background("#CFBBBB");

    threed.push();
    threed.background(170, 100, 170);

    threed.pointLight(250, 0, 250, 50, -50, 10);
    threed.ambientLight(0, 99, 104);

    threed.noStroke();
    threed.rotateX(85);
    threed.plane(3000,3000);
    threed.rotateX(-90);
    threed.rotateY(45);

    buildings[0].display(0, 0);
    buildings[1].display(-50, 0);
    buildings[2].display(0, 50);
    buildings[3].display(0, -50);
    buildings[4].display(50, 0);

    people[0].display(-42, 33);
    people[0].display(-33, 38);
    people[0].display(-22, 25);
    people[0].display(-13, 21);
    people[0].display(-20, -10);
    people[0].display(-20, -18);
    people[0].display(-20, -31);
    people[0].display(-22, 8);
    people[0].display(-22, 41);
    people[0].display(20, 21);
    people[0].display(22, 25);

    threed.pop();
    image(threed, width/6, height/6, width/3*2, height/3*2);

    noStroke();
    fill(0, 99, 104, 100);
    rect(width/6, height/6, width/3*2, height/3*2);

    twod.textAlign(CENTER, CENTER);
    twod.textFont('Courier', 10);
    twod.textStyle(NORMAL);
    twod.noStroke();
    twod.fill(255, 222, 221);

    ascii_arr = myAsciiArt.convert(threed);
    myAsciiArt.typeArray2d(ascii_arr, twod);
    image(twod, width/6, height/6, width/3*2, height/3*2);
}
