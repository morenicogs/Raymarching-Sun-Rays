let traced


const settings = {
	raymarches: 1,
	colors: ["#FF520E", "blue", 220],
	clearRadius:  50,
	obstacles: {
		amount: 25,
		radius: {
			max: 25,
			min: 5,
		},
		color: (195)
	},
	recording: {
		mode: false,
		capture: new CCapture({
			format: "jpg",
			name: "frames"
		}),
		el: document.getElementById("defaultCanvas0")
	}
}

const scene = {
	translatedPos: {
		x: 0,
		y: 0
	},
	originalMouse: {
		x: 0,
		y:0
	}
}