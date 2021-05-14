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
    threed = createGraphics(round(1280/10), round(703/10), WEBGL);
    myAsciiArt = new AsciiArt(this);

    threed.angleMode(DEGREES);

    for (let i = 0; i < 5; i++) {
        buildings[i] = new Building(30, random(60, 80));
    }
    for (let i = 0; i < 5; i++) {
        people[i] = new People(1, 15);
    }
    noLoop();
}

function draw() {

    displayScene();
    // displayText();
}

function displayScene() {

    // for (let i = 0; i < 5; i++) {
    //     buildings[i].height += 1;
    // }

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
    image(threed, width/2 - height/703*1280/3*2/2, height/3/2, height/703*1280/3*2, height/3*2);

    twod.background(0, 99, 104, 100);

    twod.textAlign(CENTER, CENTER);
    twod.textFont('Courier', 10/703*height);
    twod.textStyle(NORMAL);
    twod.noStroke();
    twod.fill(255, 222, 221);

    ascii_arr = myAsciiArt.convert(threed);
    myAsciiArt.typeArray2d(ascii_arr, twod);
    image(twod, width/2 - height/703*1280/3*2/2, height/3/2, height/703*1280/3*2, height/3*2);
}

function displayText() {


    let story = "Poke church-key wayfarers, bushwick everyday carry austin godard man bun fashion axe. Live-edge before they sold out hexagon pok pok umami hashtag occupy chambray kale chips forage portland cloud bread la croix enamel pin lo-fi.\n\nHumblebrag activated charcoal master cleanse bicycle rights crucifix seitan, tofu slow-carb cred XOXO. Portland artisan hashtag, fixie church-key subway tile small batch iceland lyft deep v.\n\n\nMicrodosing literally health goth pug dreamcatcher.\n\nPoke lomo tilde next level neutra stumptown."

    textSize(14);
    textFont("Courier");
    fill(0, 99, 104);
    text(story, width/2 - height/703*1280/3/2, height/10 + height/3 + 20, height/703*1280/3);
}
