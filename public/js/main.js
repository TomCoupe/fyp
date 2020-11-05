 import { loadImage, draw, define } from "/js/helpers.js";
//  import { define } from "/js/helpers.js";


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.fillRect(0, 0, 50, 50);  

loadImage('/images/game/tiles.png').then(image => {
    const tiles = new Map();
    define('ground', 0, 0, 16, 16, image, tiles);
    define('sky', 3, 23, 16, 16, image, tiles);
    draw('ground', context, 45, 62, tiles);

    for(let x = 0; x < 25; x++) {
        for(let y = 0; y < 14; y++) {
            draw('sky', context, x * 16, y * 16, tiles);

            if(y >= 12) {
                draw('ground', context, x * 16, y * 16, tiles);
            }
        }
    }
})