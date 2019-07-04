
const canvas = document.querySelector("#gameBoard");
const ctx = canvas.getContext("2d");
const toggleGridButton = document.querySelector("#removeGrid");
const toggleWrapButton = document.querySelector("#toggleWrap");
const scoreLabel = document.querySelector(".score");
const tileSlider = document.querySelector("#tileSlider");
let tileCount = 20;
let gridSize = 500/tileCount;
let playerX = playerY = Math.floor(tileCount/2*gridSize);
let velocityX = velocityY = 0;
let gridVisible = 1;
let wrapToggle = 1;
let score=1;

let appleX = Math.floor(tileCount/2*gridSize);
let	appleY = gridSize*3;

const Snake = function(x, y){
	this.x = x; this.y=y;
}

let snakeTrail = [new Snake(playerX, playerY)];

window.addEventListener("load", ()=>{
	canvas.height = 500;
	canvas.width =  500;
});

function drawSnake(){
	snakeTrail.forEach((snake, blockNum)=>{
		let color = "green";
		if(blockNum===0){color = "red";} //the head of the snake
		ctx.fillStyle = color;
		ctx.fillRect(snake.x, snake.y, gridSize, gridSize);
		ctx.strokeStyle = "black";
		ctx.strokeRect(snake.x, snake.y, gridSize, gridSize)
	});
}

//removing tail and putting it at the head to simulate movement
function updateSnake(){
	playerX = snakeTrail[0].x + velocityX*gridSize;
	playerY = snakeTrail[0].y - velocityY*gridSize;
	snakeTrail.pop();
	snakeTrail.unshift(new Snake(playerX, playerY));
}

function clearBoard(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGrid(){
	//building grid
	ctx.strokeStyle =  "rgba(0, 0, 255, 0.1)";
	for(var i =0; i<tileCount; i++){
		for(var j = 0; j<tileCount; j++){
			ctx.strokeRect(0+gridSize*j, 0+gridSize*i, gridSize, gridSize);
		}
	}
}

function drawApple(){
	ctx.fillStyle = "orange";
	ctx.fillRect(appleX, appleY, gridSize, gridSize);
    
}

function addSnakeToFront(){
	if(velocityX===1){
		snakeTrail.unshift(new Snake(appleX+gridSize, appleY));
	} else if(velocityX===-1){
		snakeTrail.unshift(new Snake(appleX-gridSize, appleY));
	} else if(velocityY === 1){
		snakeTrail.unshift(new Snake(appleX, appleY-gridSize));
	} else if(velocityY===-1){
		snakeTrail.unshift(new Snake(appleX, appleY+gridSize));
	}
}

function setApplePosition(){

	var appleInSnake = true;

	while(appleInSnake){
		appleX = Math.floor(Math.random()*tileCount)*gridSize;
		appleY = Math.floor(Math.random()*tileCount)*gridSize;
		appleInSnake = false;
		snakeTrail.forEach((snakeElement)=>{
			if(snakeElement.x===appleX && snakeElement.y===appleY){
				appleInSnake=true;
			}
		})
	}	
}

function restart(){
	let oldHeadX = snakeTrail[0].x;
	let oldHeadY = snakeTrail[0].y;
	snakeTrail.length=0;
	snakeTrail.push(new Snake(oldHeadX, oldHeadY));
	snakeTrail[0].x=snakeTrail[0].y=Math.floor(tileCount/2*gridSize);
	velocityX=velocityY=0;
	score=1;
	scoreLabel.textContent=0;
}

function draw(){
	clearBoard();
	if(gridVisible===1){drawGrid();}
	updateSnake();

	//hitting apple
	if(playerX===appleX && playerY===appleY){
		addSnakeToFront();
		setApplePosition();
		scoreLabel.textContent = score;
		score++;
	}

	if (wrapToggle===1) {

 		//wraping horizontally
		if(playerX>=tileCount*gridSize){
			snakeTrail[0].x = 0;
		} else if(playerX < 0){
			snakeTrail[0].x = tileCount*gridSize;
		}
	
		//wrapping vertically
		if(playerY>=tileCount*gridSize){
			snakeTrail[0].y = 0;
		} else if(playerY < 0){
			snakeTrail[0].y = tileCount*gridSize;
		}

 	}

 	//eating itself 
	for(var i =1; i<snakeTrail.length; i++){
		if(snakeTrail[0].x===snakeTrail[i].x && snakeTrail[0].y===snakeTrail[i].y){
			restart();
			break;
		}
	}

	//hitting wall when no wrap enabled
	if(wrapToggle===-1){
		if(playerX>=tileCount*gridSize || playerX<0 || playerY>=tileCount*gridSize || playerY<0){
			restart();
		}
	}

	drawSnake();
	drawApple();

}

window.addEventListener("keydown", (event)=>{
	if((event.which===37 || event.which===65) && velocityX!=1){ //left key
		velocityX = -1;
		velocityY = 0;
		console.log("left");
	} else if((event.which===38 || event.which===87) && velocityY!=-1){ //up key
		velocityY = 1;
		velocityX = 0;
		console.log("up");
	} else if((event.which===39 || event.which===68) && velocityX!=-1){ //right key
		velocityX = 1;
		velocityY = 0;
		console.log("right");
	} else if((event.which===40 || event.which===83) && velocityY!=1){
		velocityY = -1;
		velocityX = 0;
		console.log("down");
	}
});

toggleGridButton.addEventListener("click", ()=>{
	gridVisible*=-1;
});

toggleWrapButton.addEventListener("click", ()=>{
	wrapToggle*=-1;
	wrapToggle===1 ? canvas.style.border="2px solid black" : canvas.style.border="5px solid red";
});


tileSlider.oninput = function(){
	tileCount = this.value;
	gridSize = 500/tileCount;
	playerX = playerY = Math.floor(tileCount/2*gridSize);
	appleX = Math.floor(tileCount/2*gridSize);
	appleY = gridSize*3;

}

setInterval(draw, 1000/15);


