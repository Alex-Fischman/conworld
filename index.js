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

let defs = {
	"pi": "important",
	"tu": "and",
	"tuku": "separate",
	"ma": "parent",
	"maku": "child",
	"ni": "fire, hot",
	"niku": "cold",
	"niwa": "smoke",
	"niga": "radiation",
	"na": "it",
	"nasi": "them",
	"napi": "this",
	"napiku": "that, other",
	"ka": "earth, strong",
	"kaku": "weak",
	"kani": "lava",
	"ku": "not",
	"kuna": "nothing",
	"gi": "I",
	"giku": "you",
	"gisi": "we",
	"ga": "light, color",
	"gafa": "black",
	"gawa": "white",
	"gani": "red",
	"gaka": "green",
	"gaga": "yellow",
	"gasu": "blue",
	"fa": "void",
	"faku": "chaos",
	"fu": "<a href=\"#Magic\">magic</a>",
	"wa": "air",
	"wawu": "wind",
	"wani": "lightning",
	"wasu": "cloud",
	"wu": "go",
	"si": "many, <a href=\"#Numbers\">number</a>",
	"siku": "only",
	"sipi": "all",
	"sipina": "everything",
	"su": "water",
	"suni": "acid, poison, alcohol",
	"suwa": "rain",
};

let consonants = [..."ptkfshmngwlj"];
let vowels = [..."iau"];
let roots = consonants.flatMap(c => vowels.map(v => c + v));
let elements = ["fa", "ka", "ni", "ga", "wa", "su"];

let createChild = (parent, type) => parent.appendChild(document.createElement(type));

let glyph = (tr, symbol, {th = false, link = true} = {}) => {
	let a = createChild(createChild(tr, th? "th": "td"), "a");
	if (link) a.href = "#" + (a.dataset.title = symbol);
	symbol.match(/.{1,2}/g).forEach(r => createChild(a, "img").src = `Orthography/${r}.svg`);
	return a;
};

for (let h of document.getElementsByTagName("h1")) {
	let a = document.createElement("a");
	h.parentElement.prepend(a);
	a.href = "#" + h.parentElement.id;
	a.appendChild(h);
}

[..."ptkfshmngwljiau"].forEach(l => {
	let tr = createChild(createChild(document.getElementById(l), "table"), "tr");
	createChild(tr, "td").innerHTML = l + (l == "g"? " /&#331;/": "");
	glyph(tr, l, {link: false});
});

createChild(document.getElementById("orthography-vowels"), "div");
[..."iauiau"].forEach(v => glyph(document.getElementById("orthography-vowels"), v, {th: true}));
createChild(document.getElementById("orthography-vowels"), "div");
for (let i = 0; i < 18; i += 3) {
	let tr = createChild(document.getElementById("orthography-table"), "tr");
	glyph(tr, roots[i][0], {th: true});
	[i, i + 1, i + 2, i + 18, i + 19, i + 20].forEach(j => {
		let a = glyph(tr, roots[j]);
		if (!defs.hasOwnProperty(roots[j])) a.classList.add("undef");
	});
	glyph(tr, roots[i + 18][0], {th: true});
}

let wordSorter = (a, b) => {
	let c = consonants.indexOf(a[0]) - consonants.indexOf(b[0]);
	let v = vowels.indexOf(a[1]) - vowels.indexOf(b[1]);
	if (c !== 0) return c;
	else if (v !== 0) return v;
	else if (a.length > 2 && b.length > 2) return wordSorter(a.slice(2), b.slice(2));
	else if (a.length > 2) return 1;
	else if (b.length > 2) return -1;
	else throw "duplicate word in sorter: " + a + ", " + b;
};

Object.keys(defs).sort(wordSorter).forEach(r => {
	let tr = createChild(document.getElementById("dictionary-table"), "tr");
	tr.id = r;
	createChild(tr, "td").innerText = r;
	glyph(tr, r, {link: false});
	createChild(tr, "td").innerHTML = defs[r];
});

let digitList = createChild(document.getElementById("digits-table"), "tr");
let digitGlyphs = createChild(document.getElementById("digits-table"), "tr");
elements.forEach((r, i) => {
	createChild(digitList, "th").innerText = i;
	glyph(digitGlyphs, r);
});

[...Array(6).keys()].forEach(i => {
	let numberList = createChild(document.getElementById("numbers-table"), "tr");
	[...Array(6).keys()].map(n => n * 6 + i).forEach(j => {
		let number = createChild(document.getElementById("numbers-table"), "td");
		let tr = createChild(createChild(number, "table"), "tr");
		createChild(tr, "th").innerText = j;
		glyph(tr, "si" + [...j.toString(6)].map(d => elements[parseInt(d)])
			.join(""), {link: false});
	});
});

for (let x = 1; x != 6; x += 2) {
	if (x == 7) x = 0;
	glyph(document.getElementById("creatures-elements"), elements[x]);
}

let ctx;
let oscillators = {};
let playNote = (frequency, amplitude, duration, ramp = 0.05) => {
	if (!ctx) ctx = new window.AudioContext;
	if (!oscillators[frequency]) {
		let oscillator = ctx.createOscillator();
		let gain = ctx.createGain();
		oscillators[frequency] = {oscillator, gain};
		oscillator.connect(gain).connect(ctx.destination);
		oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
		gain.gain.setValueAtTime(0, ctx.currentTime);
		oscillator.start();
	}
	let {gain} = oscillators[frequency];
	gain.gain.cancelScheduledValues(ctx.currentTime);
	gain.gain.setTargetAtTime(amplitude, ctx.currentTime, ramp);
	gain.gain.setTargetAtTime(0, ctx.currentTime + duration, ramp);
};

let notes = [...Array(3).keys()].map(i => Array(6));
[...Array(3).keys()].forEach(i => {
	let keys = createChild(document.getElementById("music-table"), "tr");
	[...Array(6).keys()].forEach(j => {
		let key = createChild(keys, "td");
		key.innerText = `${j + 1} / ${i + 1}`;
		key.addEventListener("pointerdown", () => {
			if (notes[i][j]) {
				key.classList.remove("playing");
				notes[i][j] = false;
			} else {
				key.classList.add("playing");
				notes[i][j] = true;
			}
		});
	});
});

let notePlayer = () => {
	let total = notes.flat().filter(n => n).length;
	notes.forEach((ns, i) => ns.forEach((n, j) => {
		if (n) playNote(200 * (j + 1) / (i + 1), 0.5 / total, 0.02);
	}));
	window.requestAnimationFrame(notePlayer);
};
window.requestAnimationFrame(notePlayer);

// figure out functional harmonies in the 6-note scale
// funky polyrhythm for worlds colliding
