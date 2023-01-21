var bodyElem = document.querySelector("body");
var contentElem = document.querySelector("body");

var snowicons = [];

var screenW = contentElem.offsetWidth;
var screenH = contentElem.offsetHeight;

var currentId = 0;

var time = 0;
const dt = 0.2;
const a_g = 90;
const vmax = 200;

const maxIcons = 100;
const iconSpawnDelay = 0.5;
var lastIconSpawnTime = 0;

var spawnMinHeight = -20;
var spawnMaxHeight = 40;


var validIconClasses = [
	"icon-monogame",
	"icon-csharp",
	"icon-python",
	"icon-js",
	"icon-gamepad",
	"icon-linux",
	"icon-apple",
	"icon-mac",
	"icon-android",
	"icon-windows",
	"icon-windows8",
	"icon-youtube",
	"icon-youtube2",
	"icon-sphere",
	"icon-chrome",
	"icon-firefox",
	"icon-IE",
	"icon-edge",
	"icon-safari",
	"icon-opera",
	"icon-html-five",
	"icon-html-five2",
	"icon-globe",
	"icon-terminal",
	"icon-microchip",
	"icon-usb",
	"icon-id-card",
	"icon-id-card-o",
	"icon-hourglass",
	"icon-creative-commons",
	"icon-battery-three-quarters",
	"icon-heartbeat",
	"icon-child",
	"icon-laptop1",
	"icon-android",
	"icon-desktop",
	"icon-mobile-phone",
	"icon-superpowers",
	"icon-snowflake-o",
	"icon-thermometer-2",
	"icon-droplet",
	"icon-camera",
	"icon-video-camera",
	"icon-mic",
	"icon-book",
	"icon-books",
	"icon-file-zip",
	"icon-folder-open",
	"icon-lifebuoy",
	"icon-envelop",
	"icon-compass2",
	"icon-map",
	"icon-location",
	"icon-alarm",
	"icon-clock",
	"icon-printer",
	"icon-floppy-disk",
	"icon-bubbles",
	"icon-cog",
	"icon-key",
	"icon-lock",
	"icon-unlocked",
	"icon-bug",
	"icon-pie-chart",
	"icon-gift",
	"icon-trophy",
	"icon-lab",
	"icon-fire",
	"icon-bin",
	"icon-briefcase",
	"icon-magnet",
	"icon-airplane",
	"icon-truck",
	"icon-target",
	"icon-power",
	"icon-switch",
	"icon-tree",
	"icon-link",
	"icon-earth",
	"icon-eye",
	"icon-flag",
	"icon-star-full",
	"icon-heart",
	"icon-point-right",
	"icon-cancel-circle",
	"icon-blocked",
	"icon-checkmark",
	"icon-info",
	"icon-warning",
	"icon-volume-high",
	"icon-shuffle",
	"icon-infinite",
	"icon-loop2",
	"icon-scissors",
	"icon-omega",
	"icon-sigma",
	"icon-section",
	"icon-svg"
];


function createIcon(){
	//create object with position, velocity, classes to use
	let newicon = {
		x: (Math.random() * screenW), 
		y: ((Math.random() * (spawnMaxHeight - spawnMinHeight)) + spawnMinHeight), 
		vx: 0, 
		vy: (Math.random() * vmax), 
		z: 0,
		angle: Math.random(), 
		iconclass: validIconClasses[Math.floor(Math.random() * validIconClasses.length)], 
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

var permA = createPermArray(p);
var sw = 100;

var windAccelMax = 2;


function magnitude(a, b){
	return Math.sqrt(a*a+b*b);
}

function updateIcons(){
	updateScreenDimensions();
	
	let i=0;
	//run across array backwards to remove elements
	for(i = snowicons.length-1; i >=0; i--){
		let ic = snowicons[i];
		
		//Apply acceleration
		ic.vy = a_g * dt;
		
		let valuesA = [(ic.vx)/sw, (ic.vy)/sw, time];
		let valuesB = [((ic.vx) + screenW)/sw, (ic.vy)/sw, time];
		let valuesC = [((ic.vx) + screenW*2)/sw, (ic.vy)/sw, time];
		
		let dirx = (FractalSumNoise(4, permA, valuesA, 2) / 0.7);
		let diry = (FractalSumNoise(4, permA, valuesB, 2) / 0.7);
		
		dirx = dirx/magnitude(dirx, diry);
		diry = diry/magnitude(dirx, diry);
		
		let strength = (((FractalSumNoise(5, permA, valuesC, 2) / 0.7) / 2.0) + 0.5) * windAccelMax; // strength is 0-windAccelMax
		
		let windAccelx = strength * dirx;
		let windAccely = strength * diry;
		
		ic.vx += windAccelx * dt;
		ic.vy += windAccely * dt;
		
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

		let iconElem = document.querySelector("#" + ic.eid.toString());
		
		//delete the element if its off the screen
		if(ic.y >= screenH){
			iconElem.remove();
			snowicons.splice(i, 1);
			continue;
		}
		else{
			//update in icon list
			snowicons[i] = ic;
			
			//update element position
			iconElem.setAttribute("style", `left: ${ic.x.toFixed(3)}px; top: ${ic.y.toFixed(3)}px;`);
		}
	}
	
	time += dt;
	
	//Spawn a new eleemnt if its time to spawn one
	if(time >= lastIconSpawnTime + iconSpawnDelay && snowicons.length < maxIcons){
		createIcon();
		lastIconSpawnTime = time;
	}
	
}

for(i = 0; i<20; i++){
	createIcon();
}

setInterval(updateIcons, 20);