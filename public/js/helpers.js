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


