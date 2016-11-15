var bubbles = [];
var cat = [];
var bg = [];
var cycle = 0;
var capture;
var song = [];
var gifbutton;
var songbutton; 
var stopbutton;
var recording = false;
var c;
var gif;

//load the media
function preload() {
  for (var j = 0; j < 4; j++) {
    bg[j] = loadImage('stickers/background' + j + '.jpg');
  }
  for (var i = 0; i < 4; i++) {
    cat[i] = loadGif('stickers/stickers' + i + '.gif');
  }
  //for (var p = 0; p < 2; p++) {
  song = loadSound('music/song0.mp3');

}

// create capture 
function setup() {
  c = createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  //capture.hide();
  
  
  //create the gifbutton and move it
  gifbutton = createButton('SELFIE ME');
  gifbutton.mousePressed(takeaGif);
  gifbutton.position(620, 530);
  
  //play the song
  songbutton = createButton('SERENADE ME');
  songbutton.mousePressed(singtoMe);
  songbutton.position(720, 530);
  
  //stop the song 
  songbutton = createButton('STOP SINGING');
  songbutton.mousePressed(dontSing);
  songbutton.position(720, 630);
  
// // create a slider to control the opacity of video filter
// slider = createSlider(0,1, .2, .1);
//   slider.position (0, 540);
//   slider.style('width','80px')
}

//key type changed  bg
function keyTyped() {
  if (key === 'a') {
    cycle = cycle + 1;
    cycle = cycle % 4;
    console.log(cycle);
  }
}

// mousePressed adds stickers
function mousePressed() {
  var r = floor(random(0, cat.length));
  var b = new Bubble(mouseX, mouseY, cat[r]);
  bubbles.push(b);
}

// allows you to draw your own BG on white --ASK DAVID ABOUT THIS 
function mouseDragged() 
{ 
	strokeWeight(10);
	line(mouseX, mouseY, pmouseX, pmouseY);
}

//takes gif
function takeaGif() {
  recording = !recording;
  if (!recording) {
    gif.render();
  }
}

function setupGif() {
  gif = new GIF({
    workers: 2,
    quality: 40
  });

  gif.on('finished', function(blob) {
    window.open(URL.createObjectURL(blob));
    setupGif();
  });
}

//starts song--ASK DAVID HOW TO CHANGE SONGS IN HERE 
function singtoMe() {
  song.setVolume(0.1);
  song.play();
}

//stops song
function dontSing(){
  song.stop();
}

//make the stickers
function Bubble(x, y, cat) {
  this.x = x;
  this.y = y;
  this.cat = cat;

//make the stickers appear
  this.display = function() {
    push();
    imageMode(CENTER);
    image(this.cat, this.x, this.y);
    pop();
  }
}

// function takeaShot() {
//   saveFrames("out", "png", 1, 10, function(data) {
//     print(data);
//   });
// }


function draw() {
  // background(0);
  
  //dispolay the bg 
  image(bg[cycle], 0, 0, width, height);
  console.log("readme");
  
  //allow the stickers to be drawn
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
  }
  
  //display the capture 
  image(capture, 10, 10, 640, 480);
  
  /// ASK DAVID HOW I WOULD GET THIS TO CONROL OPACITY OF A PINK FILTER
  //filter(fill(252, 142, 172))
  // var val =slider.value()
  //   filter(val);

  if (recording && frameCount % 3 === 0) {
    gif.addFrame(c.elt, {
      delay: 1,
      copy: true
    });
  }

}