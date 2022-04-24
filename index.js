// nose, mouth, tongue, blood, bone, breast, wing, meat, arm/hand, ear, neck, tooth, hair, 
//	leg/foot, horn, navel, back, egg, knee, liver, skin, thigh, eye, tail, belly, feather, 
//	finger/toenail, head, heart, 
// to come, to do, to make, to say, to hit, to eat/drink, to stand, to bite, 
//	to give, to know, to laugh, to hear, to hide, to suck, to carry, to take, to blow, to run, 
//	to fall, to cry, to tie, to see, to crush/grind, to sit, to sleep, to walk
// root, name, louse, night, far, house, bitter, language name, big, fish, yesterday, new/old, 
//	good, sand, soil, leaf, bug, heavy, thick, long, wood, ash, dot/pet, sweet, rope, shadow,
//	bird, salt, small, wide, star, in, hard, bark, dry, full, grease, lie, man, moon, mountain, 
//	path, round, seed, sun, tree

// questions: who, what, where, when, why, how
// sex: male, female
// animacy: alive, dead, kill, die
// time: past, present, future

const consonants = [..."ptkfshmngwlj"];
const vowels = [..."iau"];
const roots = consonants.flatMap(c => vowels.map(v => c + v));
const elements = ["ni", "ka", "fa", "su", "wa", "ga"];
const colors = ["#C33", "#3C3", "#333", "#33C", "#CCC", "#CC3"];
const defs = {
	"pi": "important",
	"tu": "and", "tuku": "separate",
	"ma": "parent", "maku": "child",
	"ni": "fire, hot", "niku": "cold", "niwa": "smoke", "niga": "radiation",
	"na": "it", "nasi": "them", "napi": "this", "napiku": "that, other",
	"ka": "earth, strong", "kaku": "weak", "kani": "lava",
	"ku": "not", "kuna": "nothing",
	"gi": "I", "giku": "you", "gisi": "we",
	"ga": "light, color", "gafa": "black", "gawa": "white", "gani": "red", "gaka": "green",
		"gaga": "yellow", "gasu": "blue",
	"fa": "void", "faku": "chaos",
	"fu": "<a href=\"#Magic\">magic</a>",
	"wa": "air", "wawu": "wind", "wani": "lightning", "wasu": "cloud",
	"wu": "go",
	"si": "many, <a href=\"#Numbers\">number</a>", "siku": "only", "sipi": "all",
		"sipina": "everything",
	"su": "water", "suni": "acid, poison, alcohol", "suwa": "rain",
};

const getContext = canvas => {
	const context = canvas.getContext("2d");
	const {width: w, height: h} = context.canvas.getBoundingClientRect();
	context.canvas.width = w;
	context.canvas.height = h;
	context.fillStyle = "#111";
	context.fillRect(0, 0, w, h);
	context.setTransform(new DOMMatrix(w > h? 
		[h / 2, 0, 0, -h / 2, h / 2 + (w - h) / 2, h / 2]: 
		[w / 2, 0, 0, -w / 2, w / 2, w / 2 + (h - w) / 2]
	));
	return context;
};

const drawSymbol = (context, symbol, defaultColor = true) => {
	context.lineCap = "round";
	context.lineJoin = "round";
	context.lineWidth = 0.2;
	if (defaultColor) {
		const i = elements.findIndex(e => e === symbol);
		context.strokeStyle = i === -1? "#EEE": colors[i];
	}

	const line = (a, b, c, d) => { context.moveTo(a, b); context.lineTo(c, d); };
	const normalVowelLine = () => {
		if (symbol[1] === "i") line(0.8, 0.8, -0.8, 0.8);
		else if (symbol[1] === "a") line(0.8, -0.8, -0.8, -0.8);
		else if (symbol[1] === "u") line(0.8, 0, -0.8, 0)
		else throw "unknown vowel in symbol: " + symbol;
	};

	context.beginPath();
	if (symbol[0] === "p") {
		line(0.8, 0.8, 0.8, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "t") {
		line(0, 0.8, 0, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "k") {
		line(-0.8, 0.8, -0.8, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "f") {
		line(0, 0.8, 0, -0.8);
		if (symbol[1] === "u") {
			context.moveTo(0.8, 0.4);
			context.lineTo(-0.8, 0.4);
			context.moveTo(0.8, -0.4);
			context.lineTo(-0.8, -0.4);
		} else {
			line(0.8, 0, -0.8, 0);
			normalVowelLine();
		}
	} else if (symbol[0] === "s") {
		context.moveTo(0.4, 0.8);
		context.lineTo(0.4, -0.8);
		context.moveTo(-0.4, 0.8);
		context.lineTo(-0.4, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "h") {
		line(0.8, 0.8, 0.8, -0.8);
		line(-0.8, 0.8, -0.8, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "m") {
		context.moveTo(0, 0.8);
		context.lineTo(0, 0);
		context.lineTo(0.8, 0);
		line(0.8, 0.8, 0.8, -0.8);
		if (symbol[1] === "i") {
			context.moveTo(0, 0.8);
			context.lineTo(-0.8, 0.8);
		} else normalVowelLine();
	} else if (symbol[0] === "n") {
		context.moveTo(0.8, 0.8);
		context.lineTo(0.8, 0);
		context.lineTo(0, 0);
		line(0, 0.8, 0, -0.8);
		if (symbol[1] === "i") {
			context.moveTo(0, 0.8);
			context.lineTo(-0.8, 0.8);
		} else normalVowelLine();
	} else if (symbol[0] === "g") {
		context.moveTo(0, 0.8);
		context.lineTo(0, 0);
		context.lineTo(-0.8, 0);
		line(-0.8, 0.8, -0.8, -0.8);
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
	} else throw "unknown consonant in symbol: " + symbol;
	context.stroke();
};

window.addEventListener("resize", () => {
	for (const r of roots) drawSymbol(getContext(document.getElementById(r)), r);

	{
		const wordSorter = (a, b) => {
			const c = consonants.indexOf(a[0]) - consonants.indexOf(b[0]);
			const v = vowels.indexOf(a[1]) - vowels.indexOf(b[1]);
			if (c !== 0) return c;
			else if (v !== 0) return v;
			else if (a.length > 2 && b.length > 2) return wordSorter(a.slice(2), b.slice(2));
			else if (a.length > 2) return 1;
			else if (b.length > 2) return -1;
			else throw "duplicate word in sorter: " + a + ", " + b;
		};

		const createChild = (parent, type) => parent.appendChild(document.createElement(type));

		Object.keys(defs).sort(wordSorter).forEach(r => {
			const tr = createChild(document.getElementById("dictionary"), "tr");
			createChild(tr, "td").innerText = r;
			const td = createChild(tr, "td");
			for (const symbol of r.match(/.{1,2}/g))
				drawSymbol(getContext(createChild(td, "canvas")), symbol);
			createChild(tr, "td").innerHTML = defs[r];
		});
	}

	for (const i in elements) drawSymbol(getContext(document.getElementById(i)), elements[i]);

	{
		const context = getContext(document.getElementById("magic"));
		const nodes = Array(6).fill(0).map((_, i) => ({
			symbol: elements[i],
			color: colors[i],
			x: 0.79 * Math.cos(i * Math.PI / 3 + Math.PI / 2),
			y: 0.79 * Math.sin(i * Math.PI / 3 + Math.PI / 2),
		}));
		context.strokeStyle = "#222";
		for (let i = 0; i < nodes.length; ++i) {
			for (let j = i + 1; j < nodes.length; ++j) {
				if ((i === 0 && j === 3) || (i === 1 && j === 5) || (i === 2 && j === 4))
					 context.lineWidth = 0.05;
				else context.lineWidth = 0.03;
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
			context.arc(node.x, node.y, 0.2, 0, Math.PI * 2);
			context.fill();
			context.save();
			context.translate(node.x, node.y);
			context.scale(0.1, 0.1);
			drawSymbol(context, node.symbol, false);
			context.restore();
		}
	}

	for (const e of elements) drawSymbol(getContext(document.getElementById(e + "0")), e);
});

window.dispatchEvent(new Event("resize"));
