var bodyElem = document.querySelector("body");
var contentElem = document.querySelector(".cover-container");

var snowicons = [];

var screenW = contentElem.offsetWidth;
var screenH = contentElem.offsetHeight;

var currentId = 0;

var t = 0;
const dt = 0.2;
const g = 75;
const vmax = 250;

const maxIcons = 50;
const iconSpawnDelay = 1.4;
var lastIconSpawnTime = 0;

var spawnMinHeight = -20;
var spawnMaxHeight = 40;

function createIcon(){
	//create object with position, velocity, classes to use
	let newicon = {
		x: (Math.random() * screenW), 
		y: ((Math.random() * (spawnMaxHeight - spawnMinHeight)) + spawnMinHeight), 
		vx: 0, 
		vy: (Math.random() * vmax), 
		z: 0,
		angle: Math.random(), 
		iconclass:"icon-csharp", 
		idn: currentId, 
		eid:(`si${currentId}`)
	}; //todo: better randomize properties
	
	//Increment id for next icon
	currentId++;
	
	//Add to the list
	snowicons.push(newicon);
	
	// create icon to add to the page
	let newElem = document.createElement("i");
	newElem.setAttribute("class", "frontanimicon " + newicon.iconclass);
	newElem.setAttribute("id",  newicon.eid);
	newElem.setAttribute("style", `left: ${newicon.x.toFixed(3)}px; top: ${newicon.y.toFixed(3)}px;`);
	
	contentElem.appendChild(newElem);
}

function updateScreenDimensions(){
	screenW = contentElem.offsetWidth;
	screenH = contentElem.offsetHeight;
}

function updateIcons(){
	updateScreenDimensions();
	
	//run across array backwards to remove elements
	for(i = snowicons.length - 1; i >= 0; i--){
		let ic = snowicons[i];
		
		//Apply acceleration
		ic.vy = g * dt;
		
		//clamp velocity
		let vel = Math.sqrt((ic.vx * ic.vx) + (ic.vy * ic.vy));
		if(vel >= vmax){
			ic.vx = ic.vx / vel * vmax;
			ic.vy = ic.vy / vel * vmax;
		}
		
		//Apply velocity to position
		ic.x += ic.vx * dt;
		ic.y += ic.vy * dt;
		
		//find element
		let iconElem = document.querySelector(`#${ic.eid.toString()}`);
		
		//delete the element if its off the screen
		if(ic.y >= screenH){
			iconElem.remove();
			snowicons.splice(i, 1);
			continue;
		}
		
		//update in icon list
		snowicons[i] = ic;
		
		//update element position
		iconElem.setAttribute("style", `left: ${ic.x.toFixed(3)}px; top: ${ic.y.toFixed(3)}px;`);
		
	}
	
	t += dt;
	
	//Spawn a new eleemnt if its time to spawn one
	if(t >= lastIconSpawnTime + iconSpawnDelay && snowicons.length < maxIcons){
		createIcon();
		lastIconSpawnTime = t;
	}
	
}

for(i = 0; i<20; i++){
	createIcon();
}

setInterval(updateIcons, 20);



/*
canvasElem = document.querySelector("canvas");
var ctx = canvasElem.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

pw = 5;
w = 50;
sw = 10;
time = 1.2;
dt = 0.05;

sx = -0.5;
sy = -0.5;

permA = createPermArray(p);
permB = createPermArrayRand();

function updateImage(){
	time += dt;
	for(y = 0; y < w; y++){
		for(x = 0; x < w; x++){
			let values = [x/sw, y/sw, time];
			let nval = FractalSumNoise(4, permA, values, 2);
			nval = (nval + 2.0) / 4.0;
			
			brightness = Math.floor(255 * nval);

			ctx.fillStyle = rgbToHex(brightness,brightness,brightness);
			ctx.fillRect(x*pw, y*pw, pw, pw);
			
			values = [x/sw, y/sw, time];
			nval = FractalSumNoise(4, permB, values, 2);
			nval = (nval + 2.0) / 4.0;
			
			brightness = Math.floor(255 * nval);

			ctx.fillStyle = rgbToHex(brightness,brightness,brightness);
			ctx.fillRect(x*pw + w*pw + pw, y*pw, pw, pw);
		}
	}
}

setInterval(updateImage, 100);

*/