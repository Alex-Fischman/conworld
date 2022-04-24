const dist   = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
const add    = (a, b) => ({x: a.x + b.x, y: a.y + b.y});
const sub    = (a, b) => ({x: a.x - b.x, y: a.y - b.y});
const scale  = (v, s) => ({x: v.x * s, y: v.y * s});
const norm   = v      => scale(v, 1 / Math.sqrt(v.x ** 2 + v.y ** 2));
const dot    = (a, b) => a.x * b.x + a.y * b.y;

let consonants = [..."ptkfshmngwlj"];
let vowels = [..."iau"];
let roots = consonants.flatMap(c => vowels.map(v => c + v));

const context = document.getElementById("canvas").getContext("2d");
const drawSymbol = symbol => {
	context.lineCap = "round";
	context.lineJoin = "round";
	context.beginPath();
	const normalVowelLine = () => {
		if (symbol[1] === "i") {
			context.moveTo(0.8, 0.8);
			context.lineTo(-0.8, 0.8);
		} else if (symbol[1] === "a") {
			context.moveTo(0.8, -0.8);
			context.lineTo(-0.8, -0.8);
		} else if (symbol[1] === "u") {
			context.moveTo(0.8, 0);
			context.lineTo(-0.8, 0);
		}
	};

	if (symbol[0] === "p") {
		context.moveTo(0.8, 0.8);
		context.lineTo(0.8, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "t") {
		context.moveTo(0, 0.8);
		context.lineTo(0, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "k") {
		context.moveTo(-0.8, 0.8);
		context.lineTo(-0.8, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "f") {
		context.moveTo(0, 0.8);
		context.lineTo(0, -0.8);
		if (symbol[1] === "u") {
			context.moveTo(0.8, 0.4);
			context.lineTo(-0.8, 0.4);
			context.moveTo(0.8, -0.4);
			context.lineTo(-0.8, -0.4);
		} else {
			context.moveTo(0.8, 0);
			context.lineTo(-0.8, 0);
			normalVowelLine();
		}
	} else if (symbol[0] === "s") {
		context.moveTo(0.4, 0.8);
		context.lineTo(0.4, -0.8);
		context.moveTo(-0.4, 0.8);
		context.lineTo(-0.4, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "h") {
		context.moveTo(0.8, 0.8);
		context.lineTo(0.8, -0.8);
		context.moveTo(-0.8, 0.8);
		context.lineTo(-0.8, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "m") {
		context.moveTo(0, 0.8);
		context.lineTo(0, 0);
		context.lineTo(0.8, 0);
		context.moveTo(0.8, 0.8);
		context.lineTo(0.8, -0.8);
		if (symbol[1] === "i") {
			context.moveTo(0, 0.8);
			context.lineTo(-0.8, 0.8);
		} else normalVowelLine();
	} else if (symbol[0] === "n") {
		context.moveTo(0.8, 0.8);
		context.lineTo(0.8, 0);
		context.lineTo(0, 0);
		context.moveTo(0, 0.8);
		context.lineTo(0, -0.8);
		if (symbol[1] === "i") {
			context.moveTo(0, 0.8);
			context.lineTo(-0.8, 0.8);
		} else normalVowelLine();
	} else if (symbol[0] === "g") {
		context.moveTo(0, 0.8);
		context.lineTo(0, 0);
		context.lineTo(-0.8, 0);
		context.moveTo(-0.8, 0.8);
		context.lineTo(-0.8, -0.8);
		if (symbol[1] === "i") {
			context.moveTo(0, 0.8);
			context.lineTo(0.8, 0.8);
		} else normalVowelLine();
	} else if (symbol[0] === "w") {
		context.moveTo(0.8, 0.8);
		context.lineTo(0.8, 0);
		context.lineTo(-0.8, 0);
		context.lineTo(-0.8, -0.8);
		if (symbol[1] === "i") {
			context.moveTo(0, 0.8);
			context.lineTo(0.8, 0.8);
		} else normalVowelLine();
	} else if (symbol[0] === "l") {
		context.moveTo(0.8, 0.8);
		context.lineTo(0.8, 0);
		context.lineTo(0, 0);
		context.lineTo(0, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "j") {
		context.moveTo(-0.8, 0.8);
		context.lineTo(-0.8, 0);
		context.lineTo(0, 0);
		context.lineTo(0, -0.8);
		normalVowelLine();
	}
	context.stroke();
};

const drawMagic = () => {
	const nodes = Array(6).fill(0).map((_, i) => {
		const a = i * Math.PI / 3 + Math.PI / 2;
		return {
			symbol: ["ni", "ka", "fa", "su", "wa", "ga"][i],
			color: ["#E33", "#3E3", "#333", "#33E", "#EEE", "#EE3"][i], 
			...scale({x: Math.cos(a), y: Math.sin(a)}, 0.6)
		};
	});

	context.strokeStyle = "#222";
	for (let i = 0; i < nodes.length; ++i) {
		for (let j = i + 1; j < nodes.length; ++j) {
			if ((i === 0 && j === 3) || (i === 1 && j === 5) || (i === 2 && j === 4))
				 context.lineWidth = 1 / 30;
			else context.lineWidth = 1 / 60;
			context.beginPath();
			context.moveTo(nodes[i].x, nodes[i].y);
			context.lineTo(nodes[j].x, nodes[j].y);
			context.stroke();
		}
	}

	context.lineWidth = 0.2;
	context.strokeStyle = "#111";
	for (const node of nodes) {
		context.fillStyle = node.color;
		context.beginPath();
		context.arc(node.x, node.y, 0.15, 0, Math.PI * 2);
		context.fill();
		context.save();
		context.translate(node.x, node.y);
		context.scale(0.1, 0.1);
		drawSymbol(node.symbol);
		context.restore();
	}
};

window.addEventListener("resize", () => {
	const {width: w, height: h} = context.canvas.getBoundingClientRect();
	context.canvas.width = w;
	context.canvas.height = h;
	context.fillStyle = "#111";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.setTransform(new DOMMatrix(w > h? 
		[h / 2, 0, 0, -h / 2, h / 2 + (w - h) / 2, h / 2]: 
		[w / 2, 0, 0, -w / 2, w / 2, w / 2 + (h - w) / 2]
	));

	context.save();
	context.scale(1/6, 1/6);
	context.lineWidth = 0.1;
	context.strokeStyle = "#E33";
	context.translate(-5, 5);
	for (let i = 0; i < 18; i += 3) {
		[i, i + 1, i + 2, i + 18, i + 19, i + 20].forEach(j => {
			drawSymbol(roots[j]);
			context.translate(2, 0);
		});
		context.translate(-12, -2);
	}
	context.restore();

	drawMagic();
});
window.dispatchEvent(new Event("resize"));
