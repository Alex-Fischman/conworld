const dist   = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
const add    = (a, b) => ({x: a.x + b.x, y: a.y + b.y});
const sub    = (a, b) => ({x: a.x - b.x, y: a.y - b.y});
const scale  = (v, s) => ({x: v.x * s, y: v.y * s});
const norm   = v      => scale(v, 1 / Math.sqrt(v.x ** 2 + v.y ** 2));
const dot    = (a, b) => a.x * b.x + a.y * b.y;

const colors = ["#E33", "#3E3", "#333", "#33E", "#EEE", "#EE3", "#111", "#222"];
const nodes = Array(6).fill(0).map((_, i) => {
	const a = i * Math.PI / 3 + Math.PI / 2;
	return {color: colors[i], ...scale({x: Math.cos(a), y: Math.sin(a)}, 0.6)};
});

window.addEventListener("resize", () => {
	const context = document.getElementById("canvas").getContext("2d");
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.fillStyle = colors[6];
	context.fillRect(0, 0, canvas.width, canvas.height);

	const {width: w, height: h} = context.canvas.getBoundingClientRect();
	context.canvas.width = w;
	context.canvas.height = h;
	context.setTransform(new DOMMatrix(w > h? 
		[h / 2, 0, 0, -h / 2, h / 2 + (w - h) / 2, h / 2]: 
		[w / 2, 0, 0, -w / 2, w / 2, w / 2 + (h - w) / 2]
	));

	context.strokeStyle = colors[7];
	context.lineCap = "round";
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

	for (const node of nodes) {
		context.fillStyle = node.color;
		context.beginPath();
		context.arc(node.x, node.y, 0.15, 0, Math.PI * 2);
		context.fill();
	}
});
window.dispatchEvent(new Event("resize"));
