class March {
	constructor(_x, _y, _c) {
		this.position = createVector(_x,_y)
		this.obstacles = []
		this.touchPts = []
		this.closestObjectDistance = 0
		this.angle = 0
		this.ray = createVector(0, 0)
		this.rayColor = color(_c)
		this.traced = createGraphics(width, height)
		this.circles = createGraphics(width, height)
	}

	update() {
		let totalDistance = 0
		let myNewDistance = Infinity
		do {
			myNewDistance = Infinity
			const x = totalDistance * Math.cos(this.angle) + this.position.x
			const y = totalDistance * Math.sin(this.angle) + this.position.y
			
			this.rayColor.setAlpha(255)
			stroke(this.rayColor)
			strokeWeight(.5)
			line(this.position.x, this.position.y, x, y)
			for (const obstacle of this.obstacles) {
				myNewDistance = Math.min(obstacle.distanceFromPoint(x, y), myNewDistance)
			}
			noFill()
			stroke(30, 95)
			// strokeWeight(2)
			// circle(x, y, myNewDistance * 2)
			
			// this.rayColor.setAlpha(160)
			
			
			// stroke(this.rayColor)
			strokeWeight(1.25)
			circle(x, y, myNewDistance * 2)
			if(myNewDistance < 0.1) {
				this.touchPts.push({x: x, y: y, r: myNewDistance})
			}
			// this.touchPts.push({x: x, y: y, r: myNewDistance})
			totalDistance += myNewDistance
		} while(myNewDistance > 0.1 && 2* myNewDistance < width)
		// image(this.circles, 0, 0)
	}

	show() {
		this.touchPts.forEach(pt => {
			this.traced.push()
				this.traced.fill(30)
				// this.rayColor.setAlpha(60)
				this.rayColor.setAlpha(255)
				this.traced.stroke(this.rayColor)
				
				this.traced.strokeWeight(1.5)
				
				this.traced.line(pt.x, pt.y, this.position.x, this.position.y)

				
				// stroke(this.rayColor)
				// strokeWeight(0.5)
				// point(pt.x, pt.y)
				
				this.traced.pop()
		})
		this.touchPts = []
		// circle(this.position.x, this.position.y, 2 * this.closestObjectDistance)
	}

	createRay() {
		let closestDistance = Infinity
		
		const currentMag = this.ray.mag()
		const newRayEnd = createVector(0, closestDistance + currentMag)
		
		newRayEnd.setHeading(this.angle)
		this.ray = newRayEnd
		fill(255, 25)
		circle(this.ray.x + this.position.x, this.ray.y + this.position.y, 2*closestDistance)
		line(this.ray.x + this.position.x, this.ray.y + this.position.y, this.position.x, this.position.y)

	}
}