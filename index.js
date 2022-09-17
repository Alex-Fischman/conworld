// nose, mouth, tongue, blood, bone, breast, wing, meat, arm/hand, ear, neck, tooth, hair, 
//	leg/foot, horn, navel, back, egg, knee, skin, thigh, eye, tail, belly, feather, 
//	finger/toenail, head, heart, 
// to say, to hit, to eat/drink, to stand,
//	to know, to laugh, to hear, to hide, to carry, to take, to blow, to run, 
//	to fall, to cry, to tie, to crush/grind, to sit, to sleep, to walk
// root, louse, night, far, house, bitter, language name, big, fish, yesterday, new/old, 
//	good, sand, soil, leaf, bug, heavy, thick, long, wood, ash, dot/pet, sweet, rope, shadow,
//	bird, salt, small, wide, star, in, hard, bark, dry, full, grease, lie, human, moon, mountain,
//	path, round, seed, sun, tree
// male, female
// life, death
// past, future

const consonants = [..."ptkfshmngwlj"];
const vowels = [..."iau"];
const elements = ["ni", "ka", "fa", "su", "wa", "ga"];
const defs = {
	"ta": "creation", "taku": "destruction",
	"tu": "and", "tuku": "separate",
	"ki": "specific", "kiku": "general",
	"ka": "earth, strong", "kaku": "weak", "kani": "lava",
	"ku": "not", "kuna": "nothing",
	"fa": "void, order", "faku": "chaos",
	"fu": "<a href=\"#Magic\">magic</a>, fundamental",
	"si": "many", "siku": "only", "sika": "all",
	"su": "water", "suni": "acid, poison, alcohol", "suwa": "rain", "suwu": "river",
	"su  gani": "blood",
	"ha": "sound, language, talk", "haku": "quiet", "hagi": "name",
	"ma": "parent", "maku": "child",
	"ni": "fire, hot", "niku": "cold", "niwa": "lightning",
	"na": "it, noun, be", "naki": "this", "nasika": "everything",
	"nu": "do, verb, succeed", "nuku": "fail",
	"gi": "I, have", "giku": "you, give", "gisi": "we",
	"ga": "light, see", "gani": "red", "gaka": "green", "gafa": "black", "gasu": "blue",
		"gawa": "white", "gaga": "yellow",
	"wi": "space", "wiki": "here",
	"wa": "air, slow", "waku": "slow", "wawu": "wind", "wasu": "cloud",
	"wu": "go", "wuwa": "fly", "wuku": "stop", "wu wiki": "come",
	"li": "question", "lina": "what", "ligi": "who", "liwi": "where", "liji": "when", "linu": "how",
	"ji": "time", "jiki": "now", "jiga": "day", "jigaki": "today",
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
	context.lineCap = "round";
	context.lineJoin = "round";
	return context;
};

const drawSymbol = (context, symbol, color = "#EEE") => {
	context.lineWidth = 0.2;
	context.strokeStyle = color;
	const line = (a, b, ...rest) => {
		context.moveTo(a, b);
		for (let i = 0; i < rest.length; i += 2) context.lineTo(rest[i], rest[i + 1]);
	};
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
		line(0, 0.8, 0, 0, 0.8, 0, 0.8, 0.8, 0.8, -0.8);
		if (symbol[1] === "i") line(0, 0.8, -0.8, 0.8);
		else                   normalVowelLine();
	} else if (symbol[0] === "n") {
		line(0.8, 0.8, 0.8, 0, 0, 0, 0, 0.8, 0, -0.8);
		if (symbol[1] === "i") line(0, 0.8, -0.8, 0.8);
		else                   normalVowelLine();
	} else if (symbol[0] === "g") {
		line(0, 0.8, 0, 0, -0.8, 0, -0.8, 0.8, -0.8, -0.8);
		if (symbol[1] === "i") line(0, 0.8, 0.8, 0.8);
		else                   normalVowelLine();
	} else if (symbol[0] === "w") {
		line(0.8, 0.8, 0.8, 0, -0.8, 0, -0.8, -0.8);
		if (symbol[1] === "i") line(0, 0.8, 0.8, 0.8);
		else                   normalVowelLine();
	} else if (symbol[0] === "l") {
		line(0.8, 0.8, 0.8, 0, 0, 0, 0, -0.8);
		normalVowelLine();
	} else if (symbol[0] === "j") {
		line(-0.8, 0.8, -0.8, 0, 0, 0, 0, -0.8);
		normalVowelLine();
	} else if (symbol[0] === " ") {
	} else throw "unknown consonant in symbol: " + symbol;
	context.stroke();
};

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

const magic = getContext(document.getElementById("magic"));
for (let i = 0; i < 6; ++i) {
	const x = 0.79 * Math.cos(i * Math.PI / 3 + Math.PI / 2);
	const y = 0.79 * Math.sin(i * Math.PI / 3 + Math.PI / 2);
	magic.strokeStyle = "#222";
	for (let j = i + 1; j < 6; ++j) {
		const x2 = 0.79 * Math.cos(j * Math.PI / 3 + Math.PI / 2);
		const y2 = 0.79 * Math.sin(j * Math.PI / 3 + Math.PI / 2);
		magic.lineWidth = i + j === 6 || i === 0 && j === 3? 0.05: 0.03;
		magic.beginPath();
		magic.moveTo(x, y);
		magic.lineTo(x2, y2);
		magic.stroke();
	}
	magic.lineWidth = 0.2;
	magic.save();
	magic.translate(x, y);
	magic.scale(0.1, 0.1);
	magic.fillStyle = ["#E33", "#3E3", "#333", "#33E", "#EEE", "#EE3"][i];
	magic.beginPath();
	magic.arc(0, 0, 2, 0, Math.PI * 2);
	magic.fill();
	drawSymbol(magic, elements[i], "#111");
	magic.restore();
}
