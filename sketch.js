let maxTime = 400;
let strokesPerFrame = 25;

let imgNames = "img.png";
let img;
let imgIndex = -1;
let brightnessShift;
let imgLoaded = false;

function setup() {
    createCanvas(950, 700);
    nextImage();
}

function draw() {
    if (!imgLoaded) return;  // 画像がロードされるまで描画しない

    translate(width / 2, height / 2);

    for (let i = 0; i < strokesPerFrame; i++) {
        // ランダムなピクセルを選択
        let index = int(random(img.width * img.height));

        // ピクセルのRGBA値を取得
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
            // 大きなドットをたまに描画
            paintDot(pixelColor, random(2, 20) * map(frameCount, 0, maxTime, 1, 0.5));
        } else {
            // ストロークを描画
            paintStroke(map(frameCount, 0, maxTime, 40, 5), pixelColor, int(random(2, 8)) * map(frameCount, 0, maxTime, 1, 0.1));
        }
        pop();
    }

    // 一定時間を超えたら描画を停止
    if (frameCount > maxTime) {
        noLoop();
    }
}

function mousePressed() {
    nextImage();
}

function nextImage() {
    // 値のリセット
    background(255);
    loop();
    frameCount = 0;
    imgLoaded = false;

    // ランダムなシフトを作成して色相が常に同じにならないようにする
    brightnessShift = random(255);

    img = loadImage(imgNames, () => {
        img.loadPixels();
        imgLoaded = true;
    });
}

function paintStroke(strokeLength, strokeColor, strokeThickness) {
    push();
    stroke(strokeColor);
    strokeWeight(strokeThickness);
    line(-strokeLength, 0, strokeLength, 0);
    pop();
}

function paintDot(strokeColor, strokeThickness) {
    push();
    stroke(strokeColor);
    strokeWeight(strokeThickness);
    point(0, 0);
    pop();
}
