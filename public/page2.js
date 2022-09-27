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
  This project is about our aging brain. 
  Users will input their personal information to create their own brain 
  and drag different colors of habits to change their brain statement.
  To feel the aging and improve their original attitudes about the aging.
*
  The project includes 
   1. Welcome Page
   2. Choose the screen page
   3. Input personal information page 
   4. Control(interact) the colors & speed on the brain(on the screen)
   5. Thank you page (press the restart button back to the 2)
*    
  All pages are divided into two files.
  the sketch.js includes page: 1-2-3
  the page2.js includes page:4-5
/****************************************************************************
////////////////////////////////////////////////////////
//FIXED SECTION - START: DO NOT CHANGE THESE VARIABLES
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

////////////////////////////////////////////////////////
// SKETCH VARIABLES
////////////////////////////////////////////////////////
let myfont1, myfont2;

let brainImg;
let brainX,brainY;

let icons = [];

let mouseState = 0;
let iconIntro = " ";
let brainColorsChange ="";
let brainColor;

//change the user page 
let gameState = 0;

let humanImg;

let brainColorMessage;

var slayerMessage;
var clipMessage;

var colorLayer;
var colorClip;
var textLayer;

var newcolorLayer;
var newcolorClip;

var offLayers, offClips;
let offsetY=0;

let count = 0;

////////////////////////////////////////////////////////
// PRELOAD
////////////////////////////////////////////////////////
function preload(){

  myfont1 = loadFont("/assets/Poppins-Regular.ttf");
  myfont2 = loadFont("/assets/Poppins-Bold.ttf");
  brainImg = loadImage("/assets/icon/brain-alt.svg");

  let icon = new Icon("Regular exercise", "/assets/icon/exercise.png", color(210,80,60));
  icons.push(icon);

  icon = new Icon("Avoiding smoking", "/assets/icon/dont-smoke.png", color(50,120,190));
  icons.push(icon);

  icon = new Icon("Limit alcohol", "/assets/icon/no-alcohol.png", color(140,30,190));
  icons.push(icon);

  icon = new Icon("Keep learning", "/assets/icon/book.png", color(237,129,49));
  icons.push(icon);

  icon = new Icon("Good mood", "/assets/icon/smile.png", color(220,70,125));
  icons.push(icon);

  icon = new Icon("Stay social", "/assets/icon/talking.png", color(240,220,90));
  icons.push(icon);

  icon = new Icon("Sleep well", "/assets/icon/night.png", color(190,230,230));
  icons.push(icon);

  icon = new Icon("Healthy diet", "/assets/icon/diet.png", color(170,210,75));
  icons.push(icon);

  humanImg = loadImage("/assets/bc.png");
}

////////////////////////////////////////////////////////
// SETUP
////////////////////////////////////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(31,31,57);
  noStroke();
  textAlign(CENTER);
  textSize(50);
  textFont(myfont1);
  imageMode(CENTER);
  brainColor = color(255);

  brainX = width/2;
  brainY = height/3 * 1.2;

  icons[0].setPosition(1.3 * width/2, 0.12 * height * 1.3);
  icons[1].setPosition(1.7 * width/2, 0.24 * height * 1.2);
  icons[2].setPosition(1.7 * width/2, 0.4 * height * 1.2);
  icons[3].setPosition(1.3 * width/2, 0.54 * height * 1.15);
  icons[4].setPosition(0.7 * width/2, 0.12 * height * 1.3);
  icons[5].setPosition(0.3 * width/2, 0.24 * height * 1.2);
  icons[6].setPosition(0.3 * width/2, 0.4 * height * 1.2);
  icons[7].setPosition(0.7 * width/2, 0.54 * height * 1.15);

  button1 = createButton('END');
  button1.position(windowWidth * 0.34, windowHeight * 5.5/6);
  button1.size(windowWidth/3, windowWidth/9);
  button1.style('font-size', '40px');
  button1.style('color', 'white');
  button1.style('background-color', 'orange');
  button1.style('border-radius', '30px');
  button1.style('font-weight', 'bold');
  button1.mousePressed(turnPage);

  button = createButton('RESTART');
  button.position(windowWidth * 0.4, windowHeight * 0.4);
  button.size(windowWidth/5, windowWidth/5);
  button.style('font-size', '34px');
  button.style('color', 'white');
  button.style('background-color', 'orange');
  button.style('border-radius', '100px');
  button.style('font-weight', 'bold');
  button.mousePressed(restart);
  button.hide();
}

function draw() {
  background(31,31,57);

  //shows the change colors page
  if(gameState == 0){
    push()  
    textSize(38);
    textFont(myfont2);
    fill('orange');    
    text("Try to drag a icon into the center brain area", width/2, 2.4 / 3 * height);
    pop();
    push();
    fill(255);
    textSize(34);
    text(iconIntro, width/2, 4.2/5*height);
    pop();

    push();
    textSize(42);
    textFont(myfont2);
    fill('orange');
    text("Do something to keep your brain younger", width/2, 2.3/3 * height);
    pop();

    fill(brainColor);
    

    //the interactive animation of the main brain on the screen
    if(mouseState == 0){
      ellipse(brainX, brainY,width*0.45,width*0.45);
      image(brainImg, brainX, brainY, width*0.3, width*0.3);
    } 
    else if(mouseState == 1) {
      ellipse(brainX, brainY,width*0.45 + 50*sin(frameCount*0.06),width*0.45 + 50*sin(frameCount*0.06));
      image(brainImg, brainX, brainY, width*0.3, width*0.3);
    }
    else if(mouseState == 2){
      ellipse(brainX, brainY,width*0.45 + 50*sin(frameCount*0.06),width*0.45 + 50*sin(frameCount*0.06));
      image(brainImg, brainX, brainY, width*0.32, width*0.32);
    }

    for(let i = 0; i < icons.length; i++){
      icons[i].draw();
      icons[i].update();

    }   
  }else if(gameState == 1){
    textAlign(CENTER);
    textSize(50);
    noStroke();
    fill(255);
    textFont(myfont2);
    text("THANK YOU", width/2, 0.34 * height);
    push();
    translate(0,offsetY);
    image(humanImg, width/2, height/2, width*0.8, width * humanImg.height/humanImg.width*0.8);
    pop();

  }

  

}

// function mouseReleased(){
//   count = 0;
//   //1 后退播放 + 变速 （执行1 - 3s后 - 回到2）// 每拖拽icon一次（touchend），执行一次后退-3秒-前进任务。
// //播放：
//   sendMessage("/composition/layers/" + offLayers + "/clips/1/transport/position/behaviour/playdirection", 0, "i"); //
//   sendMessage("/composition/layers/" + (offLayers-1) + "/clips/1/transport/position/behaviour/playdirection", 0, "i"); //
// //变速：
//   var newSpeed = random(0.1, 0.2);
//   sendMessage("/composition/layers/" + offLayers + "/clips/1/transport/position/behaviour/speed", newSpeed, "f");
//   sendMessage("/composition/layers/" + (offLayers-1) + "/clips/1/transport/position/behaviour/speed", newSpeed, "f");
// }

function mouseDragged() {
  for(let i = 0; i < icons.length; i++){
    icons[i].checkDrug(mouseX,mouseY);
  }
}

//setTimeout(goBrain, 5000);

function goBrain(){
  sendMessage("/composition/layers/" + offLayers + "/clips/1/transport/position/behaviour/playdirection",2, "i");
  sendMessage("/composition/layers/" + (offLayers-1) + "/clips/1/transport/position/behaviour/playdirection",2, "i");
  //off - 关闭sparkles
sendMessage("/composition/layers/" +offLayers+"/clips/1/video/effects/sparkles/bypassed", 1, "i");//
// 发送白色
sendMessage("/composition/layers/"+offLayers+"/clips/1/video/effects/colorize/effect/color/palette/colors", 8, "i");
///composition/layers/5/clips/1/video/effects/colorize/bypassed
}

////////////////////////////////////////////////////////
//需要添加的代码
/* 
1 后退播放 + 变速 （执行1 - 3s后 - 回到2）// 每拖拽icon一次（touchend），执行一次后退-3秒-前进任务。
播放：
  sendMessage("/composition/layers/" + offLayers + "/clips/1/transport/position/behaviour/playdirection", 0, "i"); //
  sendMessage("/composition/layers/" + (offLayers-1) + "/clips/1/transport/position/behaviour/playdirection", 0, "i"); //
变速：
  var newSpeed = random(0.1, 0.2);
  sendMessage("/composition/layers/" + offLayers + "/clips/1/transport/position/behaviour/speed", newSpeed, "f");
  sendMessage("/composition/layers/" + (offLayers-1) + "/clips/1/transport/position/behaviour/speed", newSpeed, "f");
2 重新回到正播状态（向前播放）
  sendMessage("/composition/layers/" + offLayers + "/clips/1/transport/position/behaviour/playdirection",2, "i");
  sendMessage("/composition/layers/" + (offLayers-1) + "/clips/1/transport/position/behaviour/playdirection",2, "i");
*/



function touchEnded() {

  //Users drag different icons into the main brain that is colors changed on the screen and phone at the same time.
  for(let i = icons.length-1; i >= 0; i--){
    if(icons[i].state == 1 && mouseState == 2){
      textFont(myfont1);
      iconIntro = "Congrats! \n You do a " + icons[i].label + " to help your brain keep health!";
      icons[i].state = 0;
      brainColor = icons[i].col;

//get chosen screen-layers & clips 
      var storage=window.localStorage;
      var colorLayer = storage.getItem("storageLayer");    
      var colorClip = storage.getItem("storageClip");
      var textLayer = storage.getItem("storageText");

      var newcolorLayer = parseInt(colorLayer);
      var newcolorClip = parseInt(colorClip);
      var newtextClip = parseInt(textLayer);
//提取图层-片段
      if (newcolorLayer == 3 &&  newcolorClip == 1 && newtextClip == 10){
       offLayers = 3;
       off2Layers = 2;
       offText = 10;
    }else if (newcolorLayer == 5 &&  newcolorClip == 1 && newtextClip == 11){
       offLayers = 5;
       off2Layers = 4;
       offText = 11;
    }else if (newcolorLayer == 7 &&  newcolorClip == 1 && newtextClip == 12){
       offLayers = 7;
       off2Layers = 6;
       offText = 12;
    }else if (newcolorLayer == 9 &&  newcolorClip == 1 && newtextClip == 13){
       offLayers = 9;
       off2Layers = 8;
       offText = 13;
      }



     // 
     if (count == 0) {
    setTimeout(goBrain, 5000);
    count += 1;

//变大脑颜色
      brainColorMessage = i;
     var msg = "/composition/layers/" + newcolorLayer + "/clips/" + newcolorClip + "/video/effects/colorize/effect/color/palette/colors";
      sendMessage(msg,brainColorMessage, "i"); 

  sendMessage("/composition/layers/" + offLayers + "/clips/1/transport/position/behaviour/playdirection", 0, "i"); //
  sendMessage("/composition/layers/" + (offLayers-1) + "/clips/1/transport/position/behaviour/playdirection", 0, "i"); //

 var newSpeed = random(0.2, 0.3);
    sendMessage("/composition/layers/" + offLayers + "/clips/1/transport/position/behaviour/speed", newSpeed, "f");
    sendMessage("/composition/layers/" + (offLayers-1) + "/clips/1/transport/position/behaviour/speed", newSpeed, "f");

//sparcles
    sendMessage("/composition/layers/" + offLayers + "/clips/1/video/effects/sparkles/bypassed", 0, "i");
//sparcles color
    var scols = random(0.0, 1.0);
      sendMessage("/composition/layers/" + offLayers + "/clips/1/video/effects/sparkles/effect/color", scols, "f")
}
      
      

    }else{
      icons[i].state = 0;
    }
    
  }
  mouseState = 0;
  mouseX = 0;
  mouseY = 0;


  
  count = 0;

//   if (mouseIsPressed === true && count == 0){
//     count += 1;
//     setTimeout(goBrain, 3000);

//     count = 0;
//   //1 后退播放 + 变速 （执行1 - 3s后 - 回到2）// 每拖拽icon一次（touchend），执行一次后退-3秒-前进任务。
// //播放：
//   sendMessage("/composition/layers/" + offLayers + "/clips/1/transport/position/behaviour/playdirection", 0, "i"); //
//   sendMessage("/composition/layers/" + (offLayers-1) + "/clips/1/transport/position/behaviour/playdirection", 0, "i"); //
// //变速：
//   var newSpeed = random(0.1, 0.2);
//   sendMessage("/composition/layers/" + offLayers + "/clips/1/transport/position/behaviour/speed", newSpeed, "f");
//   sendMessage("/composition/layers/" + (offLayers-1) + "/clips/1/transport/position/behaviour/speed", newSpeed, "f");
//   }


}



function turnPage(){
  gameState = 1;
  button1.hide();
  button.show();

  turn1LayerOff(offLayers);
  turn2LayerOff(off2Layers);
  turnTextOff(offText);
  resetAgeDuration(offLayers);
}

function restart(){
  window.location.href = 'index.html';
  window.localStorage.setItem('mystate', '1'); 
}

/**********************************************************************
  create resolume functions 
***********************************************************************/
function resetAgeDuration(layer){
  sendMessage("/composition/layers/" + layer + "/clips/1/transport/position/in", 0.0, "f");
  sendMessage("/composition/layers/" + layer + "/clips/1/transport/position/out", 1.0, "f");
  
}

function turn1LayerOff(layer){
  var lsg  = "/composition/layers/" + layer + "/clear";
  sendMessage(lsg, 0, "f");    
}

function turn2LayerOff(layer){
  var l2sg = "/composition/layers/" + layer + "/clear";
  sendMessage(l2sg, 0, "f");
}

function turnTextOff(layer){
  var ltsg = "/composition/layers/" + layer + "/clear";
  sendMessage(ltsg, 0, "f"); 
}

////////////////////////////////////////////////////
// CUSTOMIZABLE SECTION - END: ENTER OUR CODE HERE
////////////////////////////////////////////////////

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

/**********************************************************************
  put the icon class at the end of all function
***********************************************************************/

class Icon{
  constructor(_name, _path, _color){
      this.x = 0;
      this.y = 0;
    
      this.img = loadImage(_path);
      this.label = _name;
      this.col = _color;
      this.state = 0;

      this.fixX = 0;
      this.fixY = 0;
  }

  setPosition(_x,_y){
      this.x = _x;
      this.y = _y;
      this.fixX = _x;
      this.fixY = _y;
  }

  draw(){
      push();
      translate(this.x,this.y);
      fill(this.col);
      ellipse(0, 0, width*0.2,  width*0.2);
      image(this.img, 0, 0, width*0.13,  width*0.13);
      pop();
      textSize(25);
      fill(233);
      text(this.label, this.fixX, this.fixY + width*0.132);
  }

  update(){
    if(this.state == 1){
      this.x = mouseX;
      this.y = mouseY;
      if(dist(this.x, this.y, brainX, brainY) < width * 0.3 ){
        mouseState = 2;
      }else{
        mouseState = 1;
      }
    }else{
      this.x = this.fixX;
      this.y = this.fixY;
    }
  }

  checkDrug(x, y){
    if(dist(x,y,this.x, this.y) <= width*0.1 && mouseState == 0){
      this.state = 1;
      mouseState = 1;
    }
  }
}