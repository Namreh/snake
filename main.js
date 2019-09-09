let scale = 20;
let parts = [[3, 1, 0], [2, 1, 0], [1, 1, 0]];
let length = parts.length;
let size = 500;
let fruit = [6, 3]
let speedRange = 10;

let snake = function(){
  for(let i = 0; i<length; i++){
    rect(parts[i][0]*20, parts[i][1]*20, 20, 20)
  }
}

function moveSnake(){

 for(let i = 0; i<length; i++){
   switch(parts[i][2]){
    case 0:
      parts[i][0]++;
      break;
    case 1:
      parts[i][1]++;
      break;
    case 2:
      parts[i][0]--;
      break;
    case 3:
      parts[i][1]--;
      break;
   }
 }
 for(let i = length-1; i>0; i--){
   parts[i][2] = parts[i-1][2];
 }
}

//draws grid
function drawGrid(){
  //x
  for(let i = 0; i<size/scale; i++){
    let x = 20*i;
    let startY = 0;
    let endY = size;
    line(x, startY, x, endY);
  }

  //y
  for(let i = 0; i<size/scale; i++){
    let y = 20*i;
    let startX = 0;
    let endX = size;
    line(startX, y, endX, y);
  }
}


function collision(){
  if(parts[0][0]*20>=size || parts[0][1]*20>=size || parts[0][1]*20<0 || parts[0][0]*20<0){
    parts = [[3, 1, 0], [2, 1, 0], [1, 1, 0]];
    length = parts.length;
  }
  for(let i = 1; i<length; i++){
    if(parts[0][0] == parts[i][0] && parts[0][1] == parts[i][1]){
      parts = [[3, 1, 0], [2, 1, 0], [1, 1, 0]];
      length = parts.length;
    }
  }
  if(parts[0][0]==fruit[0] && parts[0][1]==fruit[1]){
    fruit[0] = Math.floor(Math.random() * (+25 - +0)) + +0;
    fruit[1] = Math.floor(Math.random() * (+25 - +0)) + +0;



    length++;
    lastPart = parts[length-2]
    switch(lastPart[2]){
      case 0:
        parts[length-1] = [lastPart[0]-1, lastPart[1], lastPart[2]];
        break;
      case 1:
        parts[length-1] = [lastPart[0], lastPart[1]-1, lastPart[2]];
        break;
      case 2:
        parts[length-1] = [lastPart[0]+1, lastPart[1], lastPart[2]];
        break;
      case 3:
        parts[length-1] = [lastPart[0], lastPart[1]+1, lastPart[2]];
        break;
    }
  }


}

function setup(){
  createCanvas(size, size);
  frameRate(speedRange);
}

function draw(){
  background(51);
  collision();
  drawGrid();
  snake();
  moveSnake();

  rect(fruit[0]*20, fruit[1]*20, 20, 20)
}


document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37:
      if(parts[0][2]!==0)
        parts[0][2] = 2;
      break;
    case 38:
      if(parts[0][2]!==1)
        parts[0][2] = 3;
      break;
    case 39:
      if(parts[0][2]!==2)
        parts[0][2] = 0;
      break;
    case 40:
      if(parts[0][2]!==3)
        parts[0][2] = 1;
      break;
  }
});
