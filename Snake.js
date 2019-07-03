
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
	for(var i =0; i<20; i++){
		for(var j = 0; j<20; j++){
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

function draw(){
	clearBoard();
	drawGrid();
	updateSnake();

	if(playerX===appleX && playerY===appleY){
		addSnakeToFront();
		appleX = Math.floor(Math.random()*20+1)*gridSize;
		appleY = Math.floor(Math.random()*20)*gridSize;
	}

	if(playerX>=tileCount*gridSize){
		snakeTrail[0].x = 0;
	} else if(playerX < 0){
		snakeTrail[0].x = tileCount*gridSize;
	}

	if(playerY>=tileCount*gridSize){
		snakeTrail[0].y = 0;
	} else if(playerY < 0){
		snakeTrail[0].y = tileCount*gridSize;
	}

	for(var i =1; i<snakeTrail.length; i++){
		if(snakeTrail[0].x===snakeTrail[i].x && snakeTrail[0].y===snakeTrail[i].y){
			
			let oldHeadX = snakeTrail[0].x;
			let oldHeadY = snakeTrail[0].y;
			snakeTrail.length=0;
			snakeTrail.push(new Snake(oldHeadX, oldHeadY))
		}
	}

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

setInterval(draw, 1000/10);


