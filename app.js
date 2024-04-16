const sceneObjects = []

const scenePoints = []

let raymarch
let raymarchR




const marchers = []
const obstacles = []

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	createRayMarches()
	loadObstacles()
	
}	

function draw() {
	background(220);
	frameRate(120)
	
	translate(scene.translatedPos.x, scene.translatedPos.y)
	
	
	obstacles.forEach(obstacle => obstacle.show())

	marchers.forEach((marcher, index) => {
		if(index % 2) {
			marcher.angle -= Math.PI/4500
		} else {
			marcher.angle += Math.PI/4500
		}

		marcher.update()
		
		marcher.show()
		image(marcher.traced, 0, 0)

	})
	if(frameCount == 1) {
		
	}
	if(settings.recording.mode){
		if(frameCount == 1) {
			settings.recording.capture.start()
		}
		
		settings.recording.capture.capture(document.getElementById("defaultCanvas0"))
	}
	if(frameCount > 9000) {
		noLoop()

		if(settings.recording.mode) {
			settings.recording.capture.stop()
			settings.recording.capture.save()
		}
	}
	
}


function loadObstacles() {
	const newObstacles = []

	for (let i = 0; i < settings.obstacles.amount; i++) {
		let farEnough = true
		const newY = Math.round(random(height))
		const newX = Math.round(random(width))
		const newRadius = Math.round(settings.obstacles.radius.min + random(settings.obstacles.radius.max))
		for (const myMarcher of marchers) {
			const newdist = Math.hypot(newX - myMarcher.position.x, newY - myMarcher.position.y)
			if(newdist < settings.clearRadius) {
				farEnough = false
				i--
				continue

			} else {
				farEnough = farEnough == false ? farEnough : true
				
			}
		}

		if(farEnough == true) {
			const myNewObstacle = new Obastacle(newX,newY,newRadius)
			newObstacles.push(myNewObstacle)
			obstacles.push(myNewObstacle)
		}
	}

	marchers.forEach(marcher => marcher.obstacles = newObstacles)

}
function mouseDragged() {
	loop()
	scene.translatedPos = createVector(mouseX - scene.originalMouse.x, mouseY - scene.originalMouse.y)
}

function mousePressed() {
	scene.originalMouse = createVector(mouseX - scene.translatedPos.x, mouseY - scene.translatedPos.y)
}

function createRayMarches() {
	for (let i = 0; i < settings.raymarches; i++) {
		const newRayMarch =new March(50 + random(width-200), height/5 + random(height/3), settings.colors[i]);
		marchers.push(newRayMarch)
	}
}