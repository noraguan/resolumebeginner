/****************************************************************************
  The entire OSC code framework comes from 
  ‘TEMPLATE FOR P5JS INTERFACE TO COMMUNICATE WITH RESOLUME VIA OSC MESSAGES’
  Author: Luke Hespanhol
  Date: IDEA9102 S1 2022 Week8 
/****************************************************************************
 * 
  IDEA9102 - A2 Design process documentation
  Author: Group 04 
  Date: May 2022
  This project is about aging brain. 
  Users will input their personal information to create their own brain 
  and drag different colors of habits to change their brain statement.
  To feel the aging and improve their original attitudes about the aging.
*
 	The project includes 
 	 1. Welcome page
 	 2. Choose the screen page
 	 3. Input personal information page 
 	 4. Control(interact) the colors & speed on the brain(on the screen)
 	 5. Thank you page (press the restart button back to the 2)
* 	 
	All pages are divided into two files.
	the sketch.js includes page: 1-2-3
	the page2.js includes page:4-5

* resolume
* layer 1 - full screen
* layer 2-3 screen A * layer10 text-A
* layer 4-5 screen B * layer11 text-B
* Layer 6-7 Screen C * layer12 text-C
* Layer 8-9 Screen D * layer13 text-D
/****************************************************************************

////////////////////////////////////////////////////////
//FIXED SECTION - START: DO NOT CHANGE THESE VARIABLES
////////////////////////////////////////////////////////
/*
	Slider Example
	Source: 
		User 'Luke Franzke', posted on  Nov 23 '21
		https://openprocessing.org/sketch/1364396
*/

/*
	localStorage course
	Source: 
		https://www.runoob.com/jsref/prop-win-localstorage.html
*/

////////////////////////////////////////////////////////
/*
	Disabling canvas scroll for better experience on mobile interfce.
	Source: 
		User 'soanvig', answer posted on Jul 20 '17 at 18:23.
		https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element 
*/

/* 
	Font: Poppins-Regular, Poppins-Bold.
  Designer by Ninad Kale and Jonny Pinhorn.
	source from https://fonts.google.com/specimen/Poppins#about
*/

document.addEventListener('touchstart', function(e) {
    document.documentElement.style.overflow = 'hidden';
});

document.addEventListener('touchend', function(e) {
    document.documentElement.style.overflow = 'auto';
});


// Fixed variables
var HOST = window.location.origin;
let xmlHttpRequest = new XMLHttpRequest();
////////////////////////////////////////////////////////
//FIXED SECTION - END: DO NOT CHANGE THESE VARIABLES
////////////////////////////////////////////////////////


////////////////////////////////////////////////////
// CUSTOMIZABLE SECTION - BEGIN: ENTER OUR CODE HERE
////////////////////////////////////////////////////

var agingSpeed;
let d = 70; 

/////////////////slider 
var x1, x2, x3;
var slider_1, slider_2, slider_3, slider_4;
let q1 = 'How often do you exercise?';
let q2 = 'How healthy is your diet?';
let q3 = 'How healthy is your routine?';
let q4 = 'How is your mood?';
/////////////////input text
let myfont1, myfont2;

let nameMessage;
let sendButton;

let input1, input2;
let button;

/////////////////

let img;

let offsetY = 0;
let s_mouseY = 0;

let gameState = 0;

let button1State = 0;
let button2State = 0;
let button3State = 0;
let button4State = 0;

let timeIn, timeOut;
let A, B, C, D;
var slayerMessage;
var clipMessage;

function preload(){
	img = loadImage("/assets/homePage.jpeg");
	myfont1 = loadFont("/assets/Poppins-Regular.ttf");
	myfont2 = loadFont("/assets/Poppins-Bold.ttf");
}

///////////////////////////////////////////
// SETUP FUNCTION
///////////////////////////////////////////
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100); 

	initialiseResolume();

	button1Family();
	button2Family();

	imageMode(CENTER);

	x1 = windowWidth * 0.15;
	x2 = windowWidth * 0.85;
	x3 = windowWidth * 0.15;

	slide_1 = new Slider(windowHeight * 0.4, 0, q1);
	//	console.log(slide_1);
	slide_2 = new Slider(windowHeight * 0.525, 0, q2);
	//	console.log(slide_2);
	slide_3 = new Slider(windowHeight * 0.65, 0, q3);
	slide_4 = new Slider(windowHeight * 0.775, 0, q4);

	input1.hide();
	input2.hide();
	button.hide();


	if(localStorage.getItem('mystate')){
		gameState = 1;
		button1.show();
		button2.show();
		button3.show();
		button4.show();
	}

	//
  // window.localStorage.setItem('mystate', '1'); 

}


///////////////////////////////////////////
// DRAW FUNCTION
///////////////////////////////////////////
function draw() {
	smooth();
	background(31,31,57); //dark blue

	if(gameState == 0){
		push();
		translate(0,offsetY);
		image(img, width/2, height/2, width*0.8, width * img.height/img.width*0.8);
		pop();
	}
	else if(gameState == 1){
		textAlign(CENTER);
		textSize(50);
		noStroke();
		fill(255);
		text("Screen Location", width/2, 0.06 * height);
		rectMode(CENTER);
		noFill();
		stroke(255);
		strokeWeight(5);
		rect(width/2, 0.28*height, 0.7*width, 0.5*width, 40);
		noStroke();
		textSize(40);
		fill(255);
		text("B",width/2,0.2*height);
		text("D",width/2,0.38*height);
		text("A",0.2 * width,0.3*height);
		text("C",0.8 * width,0.3*height);
		textSize(30);
		text("Entrance", 0.29*width, 0.38*height);
		fill(255,100,0);
		ellipse(0.2*width, 0.4*height, 30, 30);

		push();
		textSize(50);
		noStroke();
		fill(255);
		textFont(myfont1);
		textAlign(CENTER);
		text("Choose Available Screen", width * 0.5, 2.8/6 * height);
		pop();
	}
	else if(gameState == 2){
		slide_1.show();
		slide_2.show();
		slide_3.show();
		slide_4.show();

		slide_1.update();
		slide_2.update();
		slide_3.update();
		slide_4.update();

		//h1
		push();
		textSize(40);
		textAlign(CENTER);
		textStyle(BOLD);
		textFont(myfont2);
		noStroke();
		text('CUSTOMIZE YOUR BRAIN', windowWidth * 0.5, windowHeight * 0.05);
		pop();
		
//h2
		push();
		textAlign(CENTER);
		fill('orange');
		textSize(32);
		textFont(myfont2);
		noStroke();
		text('Enter your name', windowWidth * 0.5, windowHeight * 0.1);
		text('Enter your age', windowWidth * 0.5, windowHeight * 0.2 + d/4);
		pop();

	}
}

function button1Family(){
  button1 = createButton('Screen A');
  button1.position(windowWidth * 0.34, windowHeight * 3/6);
  button1.size(windowWidth/3, windowWidth/9);
  button1.style('font-size', '40px');
  button1.style('color', 'white');
  button1.style('background-color', 'orange');
  button1.style('border-radius', '30px');
  button1.style('border-color', 'orange');
  button1.style('font-weight', 'bold');

  button1.mousePressed(turnPageA);

  button2 = createButton('Screen B');
  button2.position(windowWidth * 0.34, windowHeight * 3.5/6);
  button2.size(windowWidth/3, windowWidth/9);
  button2.style('font-size', '40px');
  button2.style('color', 'white');
  button2.style('background-color', 'orange');
  button2.style('border-radius', '30px');
  button1.style('border-color', 'orange');
  button2.style('font-weight', 'bold');
  button2.mousePressed(turnPageB);
  

  button3 = createButton('Screen C');
  button3.position(windowWidth * 0.34, windowHeight * 4/6);
  button3.size(windowWidth/3, windowWidth/9);
  button3.style('font-size', '40px');
  button3.style('color', 'white');
  button3.style('background-color', 'orange');
  button3.style('border-radius', '30px');
  button1.style('border-color', 'orange');
  button3.style('font-weight', 'bold');
  button3.mousePressed(turnPageC);
  

  button4 = createButton('Screen D');
  button4.position(windowWidth * 0.34, windowHeight * 4.5/6);
  button4.size(windowWidth/3, windowWidth/9);
  button4.style('font-size', '40px');
  button4.style('color', 'white');
  button4.style('background-color', 'orange');
  button4.style('border-radius', '30px');
  button1.style('border-color', 'orange');
  button4.style('font-weight', 'bold');
  button4.mousePressed(turnPageD);
  

  button1.hide();
  button2.hide();
  button3.hide();
  button4.hide();
}


function button2Family(){

//ENTER YOUR NAME
  input1 = createInput();
  input1.position(windowWidth * 1/4, windowHeight * 0.1 + d/4);
  input1.size(windowWidth/2, windowHeight/14);
  input1.style('text-align', 'center');
  input1.style('font-size', '40px');
  input1.style('font-weight', 'bold');
  input1.style('color', 'orange');
  input1.style('border-radius', '20px');

//ENTER YOUR AGE
  input2 = createInput();
  input2.position(windowWidth * 1/4, windowHeight * 0.2 + d/2);
  input2.size(windowWidth/2, windowHeight/14);
  input2.style('text-align', 'center');
  input2.style('font-size', '40px');
  input2.style('font-weight', 'bold');
  input2.style('color', 'orange');
  input2.style('border-radius', '20px');
  input2.style('text-align', 'center');
  input2.style('onfocus', 'input2.value()');


//START - user input their  information to resolume
  button = createButton('START');
  button.position(windowWidth * 0.4, windowHeight * 5/6);
  button.size(windowWidth/5, windowWidth/5);

  button.style('font-size', '40px');
  button.style('color', 'white');
  button.style('background-color', 'orange');
  button.style('border-radius', '100px');
  button.style('font-weight', 'bold');

  button.mousePressed(submit);

}

function turnPageA(){
	button1.hide();
	button2.hide();
	button3.hide();
	button4.hide();

	button.show();
	input2.show();
	input1.show();

	gameState = 2;

	button1State = 1;
}

function turnPageB(){
	button1.hide();
	button2.hide();
	button3.hide();
	button4.hide();

	button.show();
	input2.show();
	input1.show();

	gameState = 2;
	
	button2State = 1;
}

function turnPageC(){
	button1.hide();
	button2.hide();
	button3.hide();
	button4.hide();

	button.show();
	input2.show();
	input1.show();

	gameState = 2;
	
	button3State = 1;
}
function turnPageD(){
	button1.hide();
	button2.hide();
	button3.hide();
	button4.hide();

	button.show();
	input2.show();
	input1.show();

	gameState = 2;
	
	button4State = 1;
}


function mouseDragged() {

	if(gameState == 0){
		offsetY = mouseY-height;
		if(mouseY < height/2 && s_mouseY >= height/2){
			gameState = 1;
			button1.show();
			button2.show();
			button3.show();
			button4.show();
		}
		
		s_mouseY = mouseY;
	}
	
		slide_1.checkDrug();
		slide_2.checkDrug();
		slide_3.checkDrug();
		slide_4.checkDrug();
		}


function submit() {
//switch pages 
	window.location.href = 'page2.html';

//separating screen channels
	if(button1State == 1){
		loadClip(2,1); //decoration patterns
		
		loadClip(3,1); //mask layer
		slayerMessage = 3; //st
		clipMessage = 1; //st
		textMsg = 10;
		loadBrainOriginalColor(3,1); //white
		loadAreaClip(3,1); //durations
		loadSpeedClip(3,1); // aging speed

		loadTextClip(10,1);
		
	}
	else if(button2State == 1){
		loadClip(4,1); //decoration patterns

		loadClip(5,1);
		slayerMessage = 5; 
		clipMessage = 1;
		textMsg = 11;
		loadBrainOriginalColor(5,1);
		loadAreaClip(5,1);
		loadSpeedClip(5,1);

		loadTextClip(11,1);
	
	}
	else if(button3State == 1){
		loadClip(6,1); //decoration patterns

		loadClip(7,1);
		slayerMessage = 7;
		clipMessage = 1;
		textMsg = 12;
		loadBrainOriginalColor(7,1);
		loadAreaClip(7,1);		
		loadSpeedClip(7,1);

		loadTextClip(12,1);
	}
	else if(button4State == 1){
		loadClip(8,1); //decoration patterns

		loadClip(9,1); //main brain
		slayerMessage = 9;
		clipMessage = 1;
		textMsg = 13;
		loadBrainOriginalColor(9,1);
		loadAreaClip(9,1);
		loadSpeedClip(9,1);

		loadTextClip(13,1);
		
	}

//source from https://www.runoob.com/jsref/prop-win-localstorage.html
		var storage = window.localStorage;
    storage.setItem("storageLayer",slayerMessage);
    storage.setItem("storageClip",clipMessage);
    storage.setItem("storageText",textMsg);
  //  console.log(typeof storage["storageLayer"]);
  //  console.log(typeof storage["storageClip"]);

}

function initialiseResolume() {
	// load no user using video
	loadClip(1, 1);
}

//load the white color which is the original brain color
function loadBrainOriginalColor(layer, clip){
	sendMessage("/composition/layers/" + layer + "/clips/" + clip + "/video/effects/colorize/effect/color/palette/colors", 8, "i");	
	// /composition/layers/3/clips/1/video/effects/colorize/effect/color/palette/colors
	
}


////////////////////////////////////////////////////
// Helper functions:
//		- loadClip(layer, clip)
//				Loads a clip on Resolume. Arguments:
//						- layer: integer number of the layer where the clip is
//						- clip: integer number of the clip, within the layer
//		- turnLayerOff(layer)
//				Turns off a layer on Resolume. Arguments:
//						- layer: integer number of the layer to be turned off
//		- setLayerOpacity(layer, opacityLevel)
//						- layer: integer number of the layer we are setting the opacity of
//						- opacityLevel: decimal number between 0.0 (full transparency) and 1.0 (full opacity)
////////////////////////////////////////////////////
function loadClip(layer, clip) {
	sendMessage("/composition/layers/" + layer + "/clips/" + clip + "/connect", 1, "f");		
}

//different age Brian play area
function loadAreaClip(layer, clip){
	sendMessage("/composition/layers/" + layer + "/clips/" + clip + "/transport/position/in", timeIn, "f");
	sendMessage("/composition/layers/" + layer + "/clips/" + clip + "/transport/position/out", timeOut, "f");
	sendMessage("/composition/layers/" + layer + "/clips/" + clip + "/transport/position/behaviour/playdirection", 2, "i");	

	sendMessage("/composition/layers/" + (layer-1) + "/clips/" + clip + "/transport/position/in", timeIn, "f");
	sendMessage("/composition/layers/" + (layer-1) + "/clips/" + clip + "/transport/position/out", timeOut, "f");
	sendMessage("/composition/layers/" + (layer-1) + "/clips/" + clip + "/transport/position/behaviour/playdirection", 2, "i");	

}


function loadTextClip(layer, clip){
	// 1.enter your name
	const name = input1.value();
	//input1.value('');
	var nameMessage = name.substring(0, name.length);
	sendMessage("/composition/layers/" + layer + "/clips/" + clip + "/connect", 1, "f");
  console.log('name' + name);

  //+ 2.enter your age
	const age = input2.value();
	//input2.value('');
	var ageMessage = age.substring(0, age.length);
	sendMessage("/composition/layers/" + layer + "/clips/" + clip + "/video/source/blocktextgenerator/text/params/lines", nameMessage +'\n'+ageMessage, "s");
	// /composition/layers/13/clips/1/video/source/blocktextgenerator/text/params/lines
	console.log('age'+ age);


	var ageAreaMessage = parseInt(age);	

		if(ageAreaMessage <= 20 ){
			timeIn = 0;
			timeOut = 1 / 5;
		}
		else if( 20 < ageAreaMessage && ageAreaMessage <= 30 ){
			timeIn = 1 / 5;
			timeOut = 2 /5;
		}
		else if( 30 <ageAreaMessage && ageAreaMessage <= 40 ){
			timeIn = 2 / 5;
			timeOut = 3 / 5;
		}
		else if( 40 < ageAreaMessage && ageAreaMessage <= 50 ){
			timeIn = 3 / 5;
			timeOut = 4 / 5;
		}
		else if( 50 < ageAreaMessage){
			timeIn = 4 / 5;
			timeOut = 1;
		}
}

//depend on user daily habits - sliders input 
function loadSpeedClip(layer, clip){
	// 3.aging speed - the result of chooses
 	valueAll = round((slide_1.val + slide_2.val + slide_3.val + slide_4.val )/4);
 	var agingSpeed = map(valueAll, 0, 10, 0.2, 0.1);

 	//var aging1Speed = parseFloat(agingSpeed);
 	sendMessage("/composition/layers/" + layer + "/clips/" + clip + "/transport/position/behaviour/speed", agingSpeed, "f");

 	var aging2Speed = parseFloat(agingSpeed);
 	sendMessage("/composition/layers/" + (layer-1) + "/clips/" + clip + "/transport/position/behaviour/speed", aging2Speed, "f");
}


////////////////////////////////////////////////////
// CUSTOMIZABLE SECTION - END: ENTER OUR CODE HERE
////////////////////////////////////////////////////
class Slider{
	constructor(_allY, _originalValue, _questions){
		this.x1 = x1; //original line x1
		this.x2 = x2; //original line x2
		this.x3 = x3;// chosen line & ellipse x3
		this.y = _allY; //line & ellipse y
		//this.value = constrain(_originalValue, 0, 10); // score 0-10
		this.val = map(this.x3, this.x1, this.x2, 0, 10);
		
		this.d = 70; //ellipse diameter
		this.q = _questions; 

		this.state = 0; 
	}


	show(){
		//original lines
		stroke('white');
		strokeWeight(5);
		line(this.x1, this.y, this.x2, this.y);
		
		//questions
			push();
			textAlign(LEFT)
			noStroke();
			fill('white');
			textSize(34);
			text(this.q, this.x1, this.y - this.d/1.5);
			pop();
		// cursors
			fill('orange');
			noStroke();
			ellipse(this.x3, this.y, this.d, this.d);

		//chosen lines
			stroke('orange');
			strokeWeight(20);
			line(this.x1, this.y, this.x3, this.y);

		//scores
			push();
			textAlign(LEFT)
			noStroke();
			fill('white');
			textSize(30);
		//	textFont(myfont2);
			text('0', this.x1, this.y + this.d);
			text('10', this.x2 - 20,this.y + this.d);
			pop();

	}

	update(){
		if(this.state == 1){
			
			//this.y = mouseY;
			this.val = abs(round(map(this.x3, this.x1, this.x2, 0, 10)));
			push();
			noStroke();
			textStyle(BOLD);
			textSize(50);
			textFont(myfont2);
			text(this.val, this.x2 + this.d/3, this.y - this.d/2);
			pop();
		
			}
	}
	checkDrug(x,y){
	if((mouseX >= this.x1 && mouseX<=this.x2) && (mouseY >=this.y && mouseY <= (this.y + this.d))){
			this.state = 1;
			this.x3 = mouseX;
	}
}
}

/***********************************************************************
  === PLEASE DO NOT CHANGE OR DELETE THIS SECTION ===
  This function sends a OSC message to server

  Parameters:
  	- address: the OSC message address pattern string
  	- value: single value as message payload
  	- type: type of the value passed as message payload
***********************************************************************/
function sendMessage(address, value, type) {
	let postData = JSON.stringify({ id: 1, 'address': address,
                  'value': value,
                  'type': type });

	xmlHttpRequest.open("POST", HOST + '/sendMessage', false);
    xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
	xmlHttpRequest.send(postData);
}



