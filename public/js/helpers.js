//JS file full of useful functions for the project.


// Function to take an image path 'url' and resolve image.
export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        })
        image.src = url;
    });
}

//function to return all textures that are defined to be used for the background.
export function loadBackgroundTextures(tiles) {
    return loadImage('/images/game/tiles.png').then(image => {
        defineTile('ground', 0, 0, 16, 16, image, tiles);
        defineTile('sky', 3, 23, 16, 16, image, tiles);
    });
}

export function loadCharacterTexture(tiles) {
    return loadImage('/images/game/characters.gif').then(image => {
        define('idle', 276, 44, 16, 16, image, tiles);
    });
}

//funciton used to define and draw a specified tile from
export function define(name, x, y, width, height, image, tiles) {
    const buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    buffer.getContext('2d').drawImage(
        image,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height
    );
    tiles.set(name, buffer);
}

export function defineTile(name, x, y, width, height, image, tiles) {
    define(name, x * width, y * width, width, height, image, tiles);
}

//draws a specified tile 'name' onto the canvas.
export function draw(name, context, x, y, tiles) {
    const buffer = tiles.get(name);
    context.drawImage(buffer, x, y);
}

//takes values from levels json files to draw a background depending on the values within the json.
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

//reads from json file to load specified level.
export function loadLevel(name) {
    return fetch('/levels/' + name +'.json')
    .then(r => r.json());
}


