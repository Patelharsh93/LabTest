﻿/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

//Game framework variable

var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var stats: Stats;

var assets: createjs.LoadQueue;
var manifest = [
    { id: "rollButton", src: "assets/images/rollButton.png" },
    { id: "one", src: "assets/images/One.png" },
    { id: "two", src: "assets/images/two.png" },
    { id: "three", src: "assets/images/three.png" },
    { id: "four", src: "assets/images/four.png" },
    { id: "five", src: "assets/images/five.png" },
    { id: "six", src: "assets/images/six.png" },
    { id: "clicked", src: "assets/audio/Clicked.wav" }
];

//Game variables
 
var rollButton: createjs.Bitmap;
var one: createjs.Bitmap;
var two: createjs.Bitmap;
var three: createjs.Bitmap;
var four: createjs.Bitmap;
var five: createjs.Bitmap;
var six: createjs.Bitmap;
var dice1: createjs.Bitmap;
var dice2: createjs.Bitmap;

//preloaded Function
function preload()
{
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    //assets.on is an event Listener, triggers when assets are cmpletely loaded
    assets.on("complete", init, this);  
    assets.loadManifest(manifest);     //Manifest is assets manager, an array of object

    //Setup statics object
    setupStats();
}


//Callback function that intializies game objects
function init(){
    stage = new createjs.Stage(canvas);  //refrence to the stage
    stage.enableMouseOver(20);
    //Ticker is a static class
    createjs.Ticker.setFPS(60); //framerate for the game
    //event listener triggers 60 ms times every second
    createjs.Ticker.on("tick", gameLoop);

    //Calling main Function
    main();
}

function setupStats()
{
    stats = new Stats();
    stats.setMode(2);

    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '330px';
    stats.domElement.style.top = '10px';

    document.body.appendChild(stats.domElement);
}

//Call back function that creates our main gameLoop- refresed 60 fps
function gameLoop()
{

    stats.begin(); //Begin measuring

    stage.update();

    stats.end(); //
}

//Call back function that allows me to respond to button clcik events
function rollButtonClicked(event: createjs.MouseEvent)
{
    var random_no1 = Math.floor((Math.random() * 6) + 1);
    var random_no2 = Math.floor((Math.random() * 6) + 1);
    updateDice(random_no1, random_no2);
    
}

function updateDice(no1:number,no2:number)
{
    //if (no1 == 1)
    //  stage.removeChild(dice1);
    stage.removeChild(dice1);
    stage.removeChild(dice2);
    if (no1 == 1)
        dice1 = new createjs.Bitmap(assets.getResult("one"));
    if (no1 == 2)
        dice1 = new createjs.Bitmap(assets.getResult("two"));
    if (no1 == 3)
        dice1 = new createjs.Bitmap(assets.getResult("three"));
    if (no1 == 4)
        dice1 = new createjs.Bitmap(assets.getResult("four"));
    if (no1 == 5)
        dice1 = new createjs.Bitmap(assets.getResult("five"));
    if (no1 == 6)
        dice1 = new createjs.Bitmap(assets.getResult("six"));

    dice1.x = 40;
    dice1.y = 80;
    stage.addChild(dice1);

    if (no2 == 1)
        dice2 = new createjs.Bitmap(assets.getResult("one"));
    if (no2 == 2)
        dice2 = new createjs.Bitmap(assets.getResult("two"));
    if (no2 == 3)
        dice2 = new createjs.Bitmap(assets.getResult("three"));
    if (no2 == 4)
        dice2 = new createjs.Bitmap(assets.getResult("four"));
    if (no2 == 5)
        dice2 = new createjs.Bitmap(assets.getResult("five"));
    if (no2 == 6)
        dice2 = new createjs.Bitmap(assets.getResult("six"));

    dice1.x = 40;
    dice1.y = 80;
    stage.addChild(dice1);

    dice2.x = 150;
    dice2.y = 80;
    stage.addChild(dice2);
}
//Call back function that changes the alpha transparency of the button
//Mouseover event
function rollButtonOver()
{
    rollButton.alpha = 0.8;
}

//Mouseout event
function rollButtonOut()
{
    rollButton.alpha = 1.0;
}


//Our main function
function main() {

    dice1 = new createjs.Bitmap(assets.getResult("one"));
    dice1.x = 40;
    dice1.y = 80;
    stage.addChild(dice1);
    dice2 = new createjs.Bitmap(assets.getResult("three"));
    dice2.x = 150;
    dice2.y = 80;
    stage.addChild(dice2);

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