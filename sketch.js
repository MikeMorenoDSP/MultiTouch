var x1 =0;
var y1 = 0;
var x2 = 0;
var y2 = 0;
var noneFlag = 0;
var noneFlag2 = 0;
var sizeA = 0;
var sizeB = 0;


function setup() {
  // set canvas to window size

var width = myCanvas.offsetWidth;
 var sketchCanvas = createCanvas(width,700);
 sketchCanvas.parent("myCanvas");
}
var mapRange = function(from, to, s) {
  return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
};
// d = √[(x2 − x1)2 + (y2 − y1)2]
var distance = function(x1,y1,x2,y2){
  return sqrt((abs(x2-x1)*abs(x2-x1))+(abs(y2-y1)*abs(y2-y1)));
}
function draw() {
  
background(255);
  

  if (touches.length<3){
   
  for (var i = 0; i < touches.length; i++) {
    noFill();
    stroke(0,0,0, sizeA);
    strokeWeight(1);
    ellipse(touches[i].x, touches[i].y, sizeA, sizeA);
  }
  }
  //if touches are more than 2 still draw the circles
  else{
    for (var i = 0; i < 2; i++) {
      noFill();
      stroke(0,0,0, sizeA);
      strokeWeight(1);
      ellipse(touches[i].x, touches[i].y, sizeB, sizeB);
    
  }
  }
  // get 1 touch xy and set flag to playing
  if (touches.length>0){

      x1 = touches[0].x;
      y1 = touches[0].y;
      noneFlag = 0;
    
  }
  //turn off both playing flags
  else{

    noneFlag = 1;
    noneFlag2 = 1;
  }
 //  get 2nd touch xy and set flag to playing, start calculating distance
  if (touches.length>1){

      x2 = touches[1].x;
      y2 = touches[1].y;
      noneFlag2 = 0;
      var d = distance(touches[0].x,touches[0].y,touches[1].x,touches[1].y);
  }

//if touch 3 happens last one touched is the second cursor
  if (touches.length>2){
    x2 = touches[touches.length-1].x;
    y2 = touches[touches.length-1].y;
    noneFlag2 = 0;
}
//make sure 2nd touch is off if no touches
  if (touches.length==0){
    // noneFlag = 1;
     noneFlag2 = 1;

    
}
//start sizeA fading variable on 1st touch 
if (noneFlag==0){
  sizeA=sizeA+2;
     
  if (sizeA>=200){
    sizeA=200;
  }

}
else{
    sizeA=sizeA-10;
    if (sizeA<=0){
      sizeA=0;
    }
    stroke(0,0,0, sizeA);
    strokeWeight(1);
    ellipse(x1, y1, sizeA, sizeA);
}

//draw line if two touches
if(noneFlag==0&&noneFlag2==0){
  stroke(0,0,0, sizeB);
  line(x1, y1, x2, y2);
  }

 //start sizeB fading variable on 2nd touch  
if (noneFlag2==0){
  
  
 
  sizeB=sizeB+2;
     
  if (sizeB>=200){
    sizeB=200;
  }

}
else{
    sizeB=sizeB-10;
    if (sizeB<=0){
      sizeB=0;
    }
    stroke(0,0,0, sizeA);
    strokeWeight(1);
    ellipse(x2, y2, sizeB, sizeB);
}




  var mapD = mapRange([0,3000],[1,200],d);
  var x1m = mapRange ([0,width],[0,9000],x1);
  var x2m = mapRange ([0,width],[0,9000],x2);

  Pd.send('freq',[parseFloat(y1)]);
  Pd.send('freq2',[parseFloat(y2)]);
  Pd.send('filter',[parseFloat(x1m)]);
  Pd.send('filter2',[parseFloat(x2m)]);
  Pd.send('d',[parseFloat(mapD)]);

  //if no notes are on 
  if(noneFlag == true){
   Pd.send('off',[parseFloat(1)]);
  }
  else{
    Pd.send('on',[parseFloat(1)]);
  }

  if(noneFlag2 == true){
    Pd.send('off2',[parseFloat(1)]);
   }
   else{
     Pd.send('on2',[parseFloat(1)]);
   }

  push();
  textSize(32);
  text(mapD,50,50);
  pop();
  
  
}

// do this prevent default touch interaction
function mousePressed() {
  return false;
}

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

     webPdExamples.init()


      var patch
      $.get('pd/drums_v2.pd', function(mainStr) {
        // Loading the patch
        patch = Pd.loadPatch(mainStr)

        webPdExamples.patchLoaded(mainStr)
      })