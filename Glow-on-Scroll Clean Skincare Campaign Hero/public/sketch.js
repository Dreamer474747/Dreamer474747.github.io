let sounds = [
	"sound/intro.mp3",
	"sound/c-note.mp3",
	"sound/e-note.mp3",
	"sound/f-note.mp3",
	"sound/d-note.mp3",
];
let pianoSound = document.querySelector("#sound");
let hasPlayedSound = false;
let noteNum = 1;

let circles = [];
let circleNum = 50;
let randomCircles = [];

let myCanvas = document.querySelector(".my-canvas");
let welcomeLayer = document.querySelector(".welcome-layer");
let welcomeLayerBtn = document.querySelector(".welcome-layer-btn");

function setup() {
	createCanvas(windowWidth, windowHeight, myCanvas);
	
	colorMode(HSB, 360, 100, 100, 1);
	noFill();
	
	for(let i = 0; i < circleNum; i++) {
		let circ = createCircle();
		circles.push(circ);
	}
	
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	
	if (prefersReducedMotion) {
		noLoop();
	}
}

function draw() {
	
	background(0, 0, 100);
	
	drawVerticalGradient(
		color(260, 35, 55),
		color(45, 35, 65)
	);
	
	updateCircles();
	updateRandomCircles();
}

function mousePressed() {
	const canvasRect = myCanvas.getBoundingClientRect();

	// Check if mouse is outside the canvas
	if (
		mouseX + canvasRect.left < canvasRect.left ||
		mouseX + canvasRect.left > canvasRect.right ||
		mouseY + canvasRect.top < canvasRect.top ||
		mouseY + canvasRect.top > canvasRect.bottom
	) {
		// Click was outside the canvas — probably a UI element
		return;
	}

	// Optionally: block it if welcomeLayer is still visible
	if (!welcomeLayer.classList.contains("fade-out")) {
		return;
	}

	playPianoNote();

	const randomColor = createSoftColor();
	let circle = {
		x: mouseX,
		y: mouseY,
		size: 0,
		color: randomColor,
		alpha: 1
	};
	randomCircles.push(circle);
}


function isPlaying(audio) {
	return audio && !audio.paused && !audio.ended && audio.currentTime > 0;
}

function playIntroSound() {
	if (isPlaying(pianoSound)) {
		return;
	}
	
	pianoSound.src = sounds[0];
	pianoSound.muted = false;
	pianoSound.play();
	let targetVolume = 0.3;
	let fadeInterval = setInterval(() => {
  	if (pianoSound.volume < targetVolume) {
	    pianoSound.volume += 0.01;
  	} else {
	    clearInterval(fadeInterval);
  	}
	}, 100);
}

function playPianoNote() {
	if (isPlaying(pianoSound)) {
		return;
	}
	
	if (noteNum === 4) {
		noteNum = 1;
	} else {
		noteNum++;
	}

	pianoSound.src = sounds[noteNum];
	pianoSound.muted = false;
	pianoSound.play();
}

function updateRandomCircles() {
	for (let circ of randomCircles) {
		
		noFill();
		strokeWeight(10);
		
		circ.alpha -= 0.009;
		let fadedColor = circ.color;
		fadedColor.setAlpha(circ.alpha);
		stroke(fadedColor);
		
		for (let i = 0; i < 3; i++) {
			let ringSize = circ.size + i * 30;
			let faded = color(hue(circ.color), saturation(circ.color), brightness(circ.color), circ.alpha * (1 - i * 0.3));
			stroke(faded);
			ellipse(circ.x, circ.y, ringSize);
		}
		
		circ.size += 2;
	}

	randomCircles = randomCircles.filter(circ => circ.alpha > 0);
}

function updateCircles() {
	
	for (let circ of circles) {
		
		fill(circ.color);
		ellipse(circ.x, circ.y, circ.size);
		
		if (circ.x > width) circ.x = 0;
		if (circ.x < 0) circ.x = width;
		if (circ.y > height) circ.y = 0;
		if (circ.y < 0) circ.y = height;
		
		if (mouseX > 0 && mouseX <= width && mouseY > 0 && mouseY <= height) {
			let distance = dist(mouseX, mouseY, circ.x, circ.y);
			let targetAlpha = distance < circ.size / 2 ? 1 : 0;
			
			circ.glowAlpha = lerp(circ.glowAlpha, targetAlpha, 0.05);
			
			if (circ.glowAlpha > 0.01) {
				drawGlowingCircle(circ.x, circ.y, circ.size, circ.color, circ.glowAlpha);
			}
		}
		
		circ.x += circ.dx;
		circ.y += circ.dy;
	}
}

function drawVerticalGradient(c1, c2) {
	noStroke();
	for (let i = 0; i < height; i++) {
		let inter = map(i, 0, height, 0, 1);
		let c = lerpColor(c1, c2, inter);
		fill(c);
		rect(0, i, width, 2);
	}
}

function createSoftColor() {
	let useLavender = random() > 0.2;
	let h = useLavender ? random(230, 280) : random(40, 60);
	let s = random(25, 40);
	let b = random(95, 100);
	let a = random(0.4, 6);
	return color(h, s, b, a);
}

function createCircle() {
	
	const randomSize = random(40, 100);
	const randomColor = createSoftColor();
	
	let circle = {
		x: random(randomSize, width - randomSize),
		y: random(randomSize, height - randomSize),
		size: randomSize,
		color: randomColor,
		dx: random() > 0.5 ? random(0.2, 0.6) : random(0.2, 0.6) * -1,
		dy: random() > 0.5 ? random(0.2, 0.6) : random(0.2, 0.6) * -1,
		glowAlpha: 0,
	}
	return circle;
}

function drawGlowingCircle(x, y, size, baseColor, glowAlpha) {
	noStroke();
	
	let glowColor = color(hue(baseColor), saturation(baseColor), brightness(baseColor), 0.3 * glowAlpha);
	// outer layer
	fill(glowColor);
	ellipse(x, y, size * 2);
	
	// middle layer
	glowColor.setAlpha(0.4 * glowAlpha);
	fill(glowColor);
	ellipse(x, y, size * 1.5);
	
	// the circle itself
	fill(baseColor);
	ellipse(x, y, size);
}

welcomeLayerBtn.addEventListener("click", () => {
	
	welcomeLayer.classList.add("fade-out");
  
	welcomeLayer.addEventListener("transitionend", () => {
	  welcomeLayer.style.display = "none";
	}, { once: true });

	playIntroSound();
});

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	
	for (let circ of circles) {
		circ.x = constrain(circ.x, circ.size / 2, windowWidth - circ.size / 2);
		circ.y = constrain(circ.y, circ.size / 2, windowHeight - circ.size / 2);
	}
}
