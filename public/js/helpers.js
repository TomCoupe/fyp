export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        })
        image.src = url;
    });
}

export function define(name, x, y, width, height, image, tiles) {
    const buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    buffer.getContext('2d').drawImage(
        image,
        x * width,
        y * height,
        width,
        height,
        0,
        0,
        width,
        height
    );
    tiles.set(name, buffer);
}

export function draw(name, context, x, y, tiles) {
    const buffer = tiles.get(name);
    context.drawImage(buffer, x, y);
}

export function drawBackground(background, context, tiles, width, height) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for(let x = x1; x < x2; x++) {
            for(let y = y1; y < y2; y++) {
                drawTile(background.tile, context, x, y, width, height, tiles);
            }
        }
    })
}

export function drawTile(name, context, x, y, width, height, tiles) {
    draw(name, context, x * width, y * height, tiles)
}

export function loadLevel(name) {
    return fetch('/levels/' + name +'.json')
    .then(r => r.json());
}


