class Cube {
	constructor(_x, _y, _h) {
		this.position = createVector(_x,  _y)
		this.height = _h
		this.points = [createVector(_x - _h/2, _y - _h/2), createVector(_x + _h/2, _y + _h/2), createVector(_x - _h/2, _y + _h/2), createVector(_x + _h/2, _y - _h/2), createVector(_x, _y - _h/2), createVector(_x, _y + _h/2), createVector(_x - _h/2, _y), createVector(_x + _h/2, _y)]
		this.segments = [[this.points[0], this.points[2]], [this.points[0], this.points[3]], [this.points[1], this.points[3]], [this.points[1], this.points[2]]]
	}

	show() {
		square(this.position.x-this.height/2, this.position.y-this.height/2, this.height)
		// this.points.forEach(pt => circle(pt.x, pt.y, 1))
		this.segments.forEach( p => {
			push()
			fill(30)
			noStroke()
			line(p[0].x, p[0].y, p[1].x, p[1].y)
			pop()
		})
	}

	distanceToPoint(_x, _y) {
		const distances = []
		this.segments.forEach(segmentPoint => {
			const dist = Math.abs((_x - segmentPoint[0].x) * (segmentPoint[0].y -segmentPoint[1].y) + (_y - segmentPoint[0].y) * (segmentPoint[1].x - segmentPoint[0].x)) / Math.sqrt(Math.pow((segmentPoint[0].y - segmentPoint[1].y),2) + Math.pow((segmentPoint[1].x - segmentPoint[0].x),2))
			distances.push(dist)
		})
		distances.sort((a,b) => a-b)
		return distances[0]
	}
}