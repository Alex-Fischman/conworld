const consonants = [..."ptkfshmngwlj"];
const vowels = [..."iau"];
const elements = ["ni", "ka", "fa", "su", "wa", "ga"];
const defs = {
	"pi": "part, split",
	"pa": "attack, violence", "paku": "peace", "papa": "defend",
	"pu": "choice, or",
	"ti": "absorb, eat", "tihi": "taste",
	"ta": "have", "tajiju": "gain", "tajijuku": "lose",
	"tu": "create, and", "tuma": "birth",
	"ki": "focus, specific",
	"ka": "earth, hard", "kani": "lava", "kasa": "mountain",
	"ku": "negate, not", "kuna": "nothing",
	"fi": "good",
	"fa": "void, order", "faku": "chaos, weird",
	"fu": "power, strength",
	"si": "plural, number", "siku": "only",
	"sa": "large", "saju": "long", "sana": "size",
	"su": "water", "suwa": "rain", "sugu": "blood", "suni": "acid", "sufaku": "alcohol",
	"hi": "sense, feel", "hifi": "happy", "hiti": "hungry", "hita": "want",
	"ha": "sound", "hahi": "hear", "hagi": "name", "hafi": "truth", "hahifi": "laugh",
	"hu": "know, think", "huji": "learn", "hujiku": "forget",
	"mi": "male",
	"ma": "parent", "mami": "father", "mamu": "mother",
	"mu": "female",
	"ni": "fire", "niwa": "lightning",
	"na": "noun, be", "naji": "become", "naki": "this",
	"nu": "verb, do", "nufi": "succeed",
	"gi": "myself", "giku": "you", "gisi": "we",
	"ga": "light", "gahi": "see", "gasa": "sun",
	"gu": "life", "guhu": "human", "gupinu": "hand, arm", "gupiwu": "leg, foot",
	"wi": "space, direction", "wiki": "here", "wisa": "far", "wiwa": "up", "wika": "down",
	"wa": "air", "wawu": "wind", "wasu": "cloud",
	"wu": "move, go", "wuwa": "fly", "wujiku": "teleport", "wuta": "carry",
	"li": "ask", "lina": "what", "ligi": "who", "liwi": "where", "liji": "when", "linu": "how",
	"la": "sleep",
	"lu": "scent", "luhi": "smell",
	"ji": "time", "jiki": "now", "jiga": "day", "jigaku": "night", "jigaki": "today",
		"jigaju": "tomorrow", "jiku": "instant", "jiju": "future, new",
	"ja": "outwards, outside",
	"ju": "next, forward", "juna": "path",
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
		else if (symbol[1] === "u") line(0.8, 0, -0.8, 0);
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

const generatorInput = document.getElementById("generatorInput");
const generatorOutput = document.getElementById("generatorOutput");
generatorInput.addEventListener("change", _ => {
	generatorOutput.innerHTML = "";
	generatorInput.value = generatorInput.value || "";
	for (const symbol of generatorInput.value.match(/.{1,2}/g) || [])
		drawSymbol(getContext(createChild(generatorOutput, "canvas")), symbol);
});
