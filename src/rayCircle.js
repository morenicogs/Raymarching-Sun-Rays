class RayCircle {
	constructor(_x, _y, _obstacles) {
		this.position = createVector(_x, _y)
		this.obstacles = _obstacles
		this.radius = 0
	}

	calcRadius() {
		let closestDistance = Infinity
		this.obstacles.forEach( obstacle => {
			let closestPointOfObject = Infinity
			for (const point of obstacle.segments) {
				const x0 = this.position.x
				const y0 = this.position.y
				const x1 = point[1].x
				const y1 = point[1].y
				const x2 = point[0].x
				const y2 = point[0].y
				const teller = ((x2 - x1) * (y0 - y1)) - ((x0 - x1) * (y2 - y1))
				const noemer = ((x2 - x1)*(x2 - x1)) + ((y2 - y1)*(y2 - y1))
				const distance = Math.abs(teller)/Math.sqrt(noemer)
				// console.log("Distance from point: " + x0 +","+y0)
				// console.log(`Distance from to Line: (${x1},${y1})–(${x2},${x2})`)
				// console.log(`Result: ${distance}`)
				const dist1 = Math.hypot(x1 - this.position.x, y1 - this.position.y)
				const dist2 = Math.hypot(x2 - this.position.x, y2 - this.position.y)
				const length = Math.hypot(x2 - x1, y2 -y1)
				if(distance + (length) <= dist1 || distance + (length) <= dist2 ) {
					closestDistance = Math.min(dist1, closestDistance)
					closestDistance = Math.min(dist2, closestDistance)
					
				} else {
					closestDistance = Math.min(dist1, closestDistance)
					closestDistance = Math.min(dist2, closestDistance)
					closestDistance = Math.min(distance, closestDistance)
				}
				
				// if(dist1 <= Math.sqrt(2*Math.pow(obstacle.height,2))/2 || dist2 <= Math.sqrt(2*Math.pow(obstacle.height,2))/2) {
				// 	closestDistance = 0
				// }
				// closestDistance = Math.min(distance, closestDistance)
				
			}
			// closestDistance = Math.min(closestPointOfObject, closestDistance)
			const distanceToCenter = Math.hypot(obstacle.position.x - this.position.x, obstacle.position.y - this.position.y)
			if(obstacle.height > distanceToCenter) {

			}

		})
		this.radius = closestDistance
		return closestDistance
	}

	show() {
		fill(30, 25)
		stroke(30, 60)
		circle(this.position.x, this.position.y, 2 * this.radius)
	}
	
}