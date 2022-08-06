// nose, mouth, tongue, blood, bone, breast, wing, meat, arm/hand, ear, neck, tooth, hair, 
//	leg/foot, horn, navel, back, egg, knee, liver, skin, thigh, eye, tail, belly, feather, 
//	finger/toenail, head, heart, 
// to come, to do, to make, to say, to hit, to eat/drink, to stand, to bite, 
//	to give, to know, to laugh, to hear, to hide, to suck, to carry, to take, to blow, to run, 
//	to fall, to cry, to tie, to see, to crush/grind, to sit, to sleep, to walk
// root, name, louse, night, far, house, bitter, language name, big, fish, yesterday, new/old, 
//	good, sand, soil, leaf, bug, heavy, thick, long, wood, ash, dot/pet, sweet, rope, shadow,
//	bird, salt, small, wide, star, in, hard, bark, dry, full, grease, lie, human, moon, mountain, 
//	path, round, seed, sun, tree

// questions: why, how
// sex: male, female
// animacy: alive, dead, kill, die
// time: past, future

const consonants = [..."ptkfshmngwlj"];
const vowels = [..."iau"];
const elements = ["ni", "ka", "fa", "su", "wa", "ga"];
const defs = {
	"tu": "and", "tuku": "separate",
	"ka": "earth, strong", "kaku": "weak", "kani": "lava",
	"ku": "not", "kuna": "nothing",
	"fa": "void, order", "faku": "chaos",
	"fu": "<a href=\"#Magic\">magic</a>",
	"si": "many", "siku": "only", "sika": "all", "sikana": "everything",
	"su": "water", "suni": "acid, poison, alcohol", "suwa": "rain", "suwu": "river",
	"su  gani": "blood",
	"ma": "parent", "maku": "child",
	"ni": "fire, hot", "niku": "cold", "niwa": "lightning",
	"na": "it", "nasi": "them", "naka": "this", "nakaku": "that",
	"gi": "I", "giku": "you", "gisi": "we",
	"ga": "light", "gani": "red", "gaka": "green", "gafa": "black", "gasu": "blue", "gawa": "white", "gaga": "yellow",
	"wi": "space", "wika": "here",
	"wa": "air, slow", "waku": "slow", "wawu": "wind", "wasu": "cloud",
	"wu": "go",
	"li": "question", "lina": "what", "ligi": "who", "liwi": "where", "liji": "when",
	"ji": "time", "jika": "now", "jiga": "day", "jigaka": "today",
};

const createChild = (parent, type) => parent.appendChild(document.createElement(type));

const getContext = canvas => {
	const context = canvas.getContext("2d");
	const {width: w, height: h} = canvas.getBoundingClientRect();
	canvas.width = w;
	canvas.height = h;
	context.fillStyle = "#111";
	context.fillRect(0, 0, w, h);
	context.setTransform(new DOMMatrix(w > h? 
		[h / 2, 0, 0, -h / 2, h / 2 + (w - h) / 2, h / 2]: 
		[w / 2, 0, 0, -w / 2, w / 2, w / 2 + (h - w) / 2]
	));
	return context;
};

const drawSymbol = (context, symbol, color = "#EEE") => {
	context.lineCap = "round";
	context.lineJoin = "round";
	context.lineWidth = 0.2;
	context.strokeStyle = color;

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
			line(0.8, 0.4, -0.8, 0.4);
			line(0.8, -0.4, -0.8, -0.4);
		} else {
			line(0.8, 0, -0.8, 0);
			normalVowelLine();
		}
	} else if (symbol[0] === "s") {
		line(0.4, 0.8, 0.4, -0.8);
		line(-0.4, 0.8, -0.4, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "h") {
		line(0.8, 0.8, 0.8, -0.8);
		line(-0.8, 0.8, -0.8, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "m") {
		line(0, 0.8, 0, 0);
		context.lineTo(0.8, 0);
		line(0.8, 0.8, 0.8, -0.8);
		if (symbol[1] === "i") line(0, 0.8, -0.8, 0.8);
		else                   normalVowelLine();
	} else if (symbol[0] === "n") {
		line(0.8, 0.8, 0.8, 0);
		context.lineTo(0, 0);
		line(0, 0.8, 0, -0.8);
		if (symbol[1] === "i") line(0, 0.8, -0.8, 0.8);
		else                   normalVowelLine();
	} else if (symbol[0] === "g") {
		line(0, 0.8, 0, 0);
		context.lineTo(-0.8, 0);
		line(-0.8, 0.8, -0.8, -0.8);
		if (symbol[1] === "i") line(0, 0.8, 0.8, 0.8);
		else                   normalVowelLine();
	} else if (symbol[0] === "w") {
		line(0.8, 0.8, 0.8, 0);
		context.lineTo(-0.8, 0);
		context.lineTo(-0.8, -0.8);
		if (symbol[1] === "i") line(0, 0.8, 0.8, 0.8);
		else                   normalVowelLine();
	} else if (symbol[0] === "l") {
		line(0.8, 0.8, 0.8, 0);
		context.lineTo(0, 0);
		context.lineTo(0, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "j") {
		line(-0.8, 0.8, -0.8, 0);
		context.lineTo(0, 0);
		context.lineTo(0, -0.8);
		normalVowelLine();
	} else if (symbol[0] === " ") {
	} else throw "unknown consonant in symbol: " + symbol;
	context.stroke();
};

{
	const orthography = document.getElementById("orthography");
	const header = createChild(orthography, "tr");
	for (const vowel of [..." iauiau "]) createChild(header, "td").innerText = vowel;
	for (let i = 0; i < 6; ++i) {
		const tr = createChild(orthography, "tr");
		createChild(tr, "td").innerText = [..."ptkfsh"][i];
		for (let j = 0; j < 6; ++j) {
			const word = consonants[i + 6 * Math.floor(j / 3)] + vowels[j % 3];
			const context = getContext(createChild(createChild(tr, "td"), "canvas"));
			drawSymbol(context, word, defs.hasOwnProperty(word) ? "#EEE" : "#E11");
		}
		createChild(tr, "td").innerText = [..."mngwlj"][i];
	}
}

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

	Object.keys(defs).sort(wordSorter).forEach(r => {
		const tr = createChild(document.getElementById("dictionary"), "tr");
		createChild(tr, "td").innerText = r;
		const td = createChild(tr, "td");
		for (const symbol of r.match(/.{1,2}/g))
			drawSymbol(getContext(createChild(td, "canvas")), symbol);
		createChild(tr, "td").innerHTML = defs[r];
	});
}

{
	const context = getContext(document.getElementById("magic"));
	for (let i = 0; i < 6; ++i) {
		const x = 0.79 * Math.cos(i * Math.PI / 3 + Math.PI / 2);
		const y = 0.79 * Math.sin(i * Math.PI / 3 + Math.PI / 2);
		context.strokeStyle = "#222";
		for (let j = i + 1; j < 6; ++j) {
			const x2 = 0.79 * Math.cos(j * Math.PI / 3 + Math.PI / 2);
			const y2 = 0.79 * Math.sin(j * Math.PI / 3 + Math.PI / 2);
			context.lineWidth = i + j === 6 || i === 0 && j === 3? 0.05: 0.03;
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(x2, y2);
			context.stroke();
		}
		context.lineWidth = 0.2;
		context.save();
		context.translate(x, y);
		context.scale(0.1, 0.1);
		context.fillStyle = ["#E33", "#3E3", "#333", "#33E", "#EEE", "#EE3"][i];
		context.beginPath();
		context.arc(0, 0, 2, 0, Math.PI * 2);
		context.fill();
		drawSymbol(context, elements[i], "#111");
		context.restore();
	}
}
