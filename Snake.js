
const canvas = document.querySelector("#gameBoard");
const ctx = canvas.getContext("2d");
const gridSize = 500/20;
const tileCount = 20;
let playerX = playerY = Math.floor(tileCount/2*gridSize);
let velocityX = velocityY = 0;

let appleX = appleY = 100;

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
	});
}

//removing tail and putting it at the head to simulate movement
function updateSnake(){
	playerX = snakeTrail[0].x +velocityX*gridSize;
	playerY = snakeTrail[0].y -velocityY*gridSize;
	snakeTrail.pop();
	snakeTrail.push(new Snake(playerX, playerY));
}

function clearBoard(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGrid(){
	//building grid
	ctx.strokeStyle =  "rgba(0, 0, 255, 0.1)";
	for(var i =0; i<20; i++){
		for(var j = 0; j<20; j++){
			ctx.strokeRect(0+gridSize*j, 0+gridSize*i, gridSize, gridSize);
		}
	}
}

function drawApple(){
	ctx.beginPath(); //off shift is needed below in order to center apple in grid
    ctx.arc(appleX-gridSize/2, appleY-gridSize/2, Math.floor(gridSize/2)-1, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    
}

function draw(){
	clearBoard();
	drawGrid();
	updateSnake();
	drawSnake();
	drawApple();
}

window.addEventListener("keydown", (event)=>{
	if(event.which===37 && velocityX!=1){ //left key
		velocityX = -1;
		velocityY = 0;
		console.log("left");
	} else if(event.which===38 && velocityY!=-1){ //up key
		velocityY = 1;
		velocityX = 0;
		console.log("up");
	} else if(event.which===39 && velocityX!=-1){ //right key
		velocityX = 1;
		velocityY = 0;
		console.log("right");
	} else if(event.which===40 && velocityY!=1){
		velocityY = -1;
		velocityX = 0;
		console.log("down");
	}
});

setInterval(draw, 1000/20);


