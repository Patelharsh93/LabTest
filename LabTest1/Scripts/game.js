/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
//Game framework variable
var canvas = document.getElementById("canvas");
var stage;
var stats;
var assets;
var manifest = [
    { id: "rollButton", src: "assets/images/rollButton.png" },
    { id: "One", src: "assets/images/One.png" },
    { id: "two", src: "assets/images/two.png" },
    { id: "three", src: "assets/images/three.png" },
    { id: "four", src: "assets/images/four.png" },
    { id: "five", src: "assets/images/five.png" },
    { id: "six", src: "assets/images/six.png" },
    { id: "clicked", src: "assets/audio/Clicked.wav" }
];
//Game variables
var rollButton;
var one;
var two;
var three;
var four;
var five;
var six;
var dice1;
var dice2;
var r1;
var r2;
var random1;
var random2;
//preloaded Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    //assets.on is an event Listener, triggers when assets are cmpletely loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest); //Manifest is assets manager, an array of object
    //Setup statics object
    setupStats();
}
//Callback function that intializies game objects
function init() {
    stage = new createjs.Stage(canvas); //refrence to the stage
    stage.enableMouseOver(20);
    //Ticker is a static class
    createjs.Ticker.setFPS(60); //framerate for the game
    //event listener triggers 60 ms times every second
    createjs.Ticker.on("tick", gameLoop);
    //Calling main Function
    main();
}
function setupStats() {
    stats = new Stats();
    stats.setMode(2);
    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '330px';
    stats.domElement.style.top = '10px';
    document.body.appendChild(stats.domElement);
}
//Call back function that creates our main gameLoop- refresed 60 fps
function gameLoop() {
    stats.begin(); //Begin measuring
    stage.update();
    stats.end(); //
}
//Call back function that allows me to respond to button clcik events
function rollButtonClicked(event) {
    random1 = Math.floor((Math.random() * 6) + 1); //For dice1
    random2 = Math.floor((Math.random() * 6) + 1); //For dice2
    newDice(random1, random2);
}
function newDice(n1, n2) {
    //dice1 clear
    stage.removeChild(dice1);
    //dice2 clear
    stage.removeChild(dice2);
    //clearing r1 
    stage.removeChild(r1);
    //clearing r2
    stage.removeChild(r2);
    if (n1 == 1)
        dice1 = new createjs.Bitmap(assets.getResult("One"));
    if (n1 == 2)
        dice1 = new createjs.Bitmap(assets.getResult("two"));
    if (n1 == 3)
        dice1 = new createjs.Bitmap(assets.getResult("three"));
    if (n1 == 4)
        dice1 = new createjs.Bitmap(assets.getResult("four"));
    if (n1 == 5)
        dice1 = new createjs.Bitmap(assets.getResult("five"));
    if (n1 == 6)
        dice1 = new createjs.Bitmap(assets.getResult("six"));
    dice1.x = 40;
    dice1.y = 80;
    stage.addChild(dice1);
    if (n2 == 1)
        dice2 = new createjs.Bitmap(assets.getResult("One"));
    if (n2 == 2)
        dice2 = new createjs.Bitmap(assets.getResult("two"));
    if (n2 == 3)
        dice2 = new createjs.Bitmap(assets.getResult("three"));
    if (n2 == 4)
        dice2 = new createjs.Bitmap(assets.getResult("four"));
    if (n2 == 5)
        dice2 = new createjs.Bitmap(assets.getResult("five"));
    if (n2 == 6)
        dice2 = new createjs.Bitmap(assets.getResult("six"));
    dice1.x = 40;
    dice1.y = 80;
    stage.addChild(dice1);
    dice2.x = 150;
    dice2.y = 80;
    stage.addChild(dice2);
    //add label
    r1 = new createjs.Text("" + random1, "20px Consolas", "#D31515");
    r1.x = 80;
    r1.y = 200;
    stage.addChild(r1);
    r2 = new createjs.Text("" + random2, "20px Consolas", "#D31515");
    r2.x = 180;
    r2.y = 200;
    stage.addChild(r2);
}
//Call back function that changes the alpha transparency of the button
//Mouseover event
function rollButtonOver() {
    rollButton.alpha = 0.8;
}
//Mouseout event
function rollButtonOut() {
    rollButton.alpha = 1.0;
}
//Our main function
function main() {
    //add dice1
    dice1 = new createjs.Bitmap(assets.getResult("One"));
    dice1.x = 40;
    dice1.y = 80;
    stage.addChild(dice1);
    //add dice2
    dice2 = new createjs.Bitmap(assets.getResult("two"));
    dice2.x = 150;
    dice2.y = 80;
    stage.addChild(dice2);
    //add roll button 
    rollButton = new createjs.Bitmap(assets.getResult("rollButton"));
    rollButton.regX = rollButton.getBounds().width * 0.5;
    rollButton.regY = rollButton.getBounds().height * 0.5;
    rollButton.x = 160;
    rollButton.y = 370;
    stage.addChild(rollButton);
    rollButton.on("click", rollButtonClicked);
    rollButton.on("mouseover", rollButtonOver);
    rollButton.on("mouseout", rollButtonOut);
}
//# sourceMappingURL=game.js.map