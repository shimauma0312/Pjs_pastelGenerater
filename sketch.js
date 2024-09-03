let maxTime = 400;
let strokesPerFrame = 25;

let imgNames = 'img.png';
let img;
let brightnessShift;
let imgLoaded = false;

function setup() {
    // windoiwサイズ
    createCanvas(800, 800);
    colorMode(HSB, 255);
    nextImage();
}

function draw() {
    if (!imgLoaded) return;  // 画像がロードされるまで描画しない

    translate(width / 2, height / 2);

    for (let i = 0; i < strokesPerFrame; i++) {
        // Pick a random pixel.
        let index = int(random(img.width * img.height));

        // Get pixel's RGBA values.
        let r = img.pixels[index * 4];
        let g = img.pixels[index * 4 + 1];
        let b = img.pixels[index * 4 + 2];
        let a = img.pixels[index * 4 + 3];

        let pixelColor = color(r, g, b, a);

        let x = index % img.width;
        let y = int(index / img.width);

        push();
        translate(x - img.width / 2, y - img.height / 2);

        if (frameCount % 5 == 0) {
            // Paint big dots once in a while.
            paintDot(pixelColor, random(2, 20) * map(frameCount, 0, maxTime, 1, 0.5));
        } else {
            // Paint a stroke.
            paintStroke(map(frameCount, 0, maxTime, 40, 5), pixelColor, int(random(2, 8)) * map(frameCount, 0, maxTime, 1, 0.1));
        }
        pop();
    }

    // Stop drawing once it exceeds the time.
    if (frameCount > maxTime) {
        noLoop();
    }
}

function mousePressed() {
    nextImage();
}

function nextImage() {
    // Reset values.
    background(255);
    loop();
    frameCount = 0;
    imgLoaded = false;

    // Make shift random so hues aren't always the same.
    brightnessShift = random(255);

    // Load the next image.
    img = loadImage(imgNames, () => {
        img.loadPixels();
        imgLoaded = true;
    });
}

function paintStroke(strokeLength, strokeColor, strokeThickness) {
    let b = brightness(strokeColor);

    let bShift = b + brightnessShift;
    if (bShift > 255) {
        bShift -= 255;
    }

    push();
    rotate(radians(map(b, 0, 255, -180, 180)));

    stroke(map(bShift, 0, 255, 0, 255), 150, map(b, 0, 255, 0, 100), 50);
    line(-strokeLength, 1, strokeLength, 1);

    stroke(map(bShift, 0, 255, 0, 255), 150, map(b, 0, 255, 0, 255));
    strokeWeight(strokeThickness);
    line(-strokeLength, 0, strokeLength, 0);

    stroke(map(bShift, 0, 255, 0, 255), 150, map(b, 0, 255, 150, 255), 20);
    line(-strokeLength, 2, strokeLength, 2);

    pop();
}

function paintDot(strokeColor, strokeThickness) {
    let b = brightness(strokeColor);

    let bShift = b + brightnessShift;
    if (bShift > 255) {
        bShift -= 255;
    }

    push();
    rotate(radians(random(-180, 180)));

    stroke(map(bShift, 0, 255, 0, 255), 150, map(b, 0, 255, 0, 255));
    strokeWeight(strokeThickness);
    line(0, 0, 5, 0);

    pop();
}
