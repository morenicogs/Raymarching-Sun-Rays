class Obastacle {
	constructor(_x, _y, _r) {
		this.position = createVector(_x, _y)
		this.radius = _r
	}

	show() {
		fill(settings.obstacles.color)
		noStroke()
		circle(this.position.x, this.position.y, this.radius * 2)
	}

	distanceFromPoint(_x, _y) {
		const distanceToCenter = Math.hypot(this.position.x - _x, this.position.y - _y)
		const distanceToCircle = distanceToCenter - this.radius
		if(distanceToCircle < 0) {
			return 0
		} else {
			return distanceToCircle
		}
	}
}