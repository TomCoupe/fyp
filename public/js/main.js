// import { loadImage } from "./helpers.js";


function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        })
        image.src = url;
    }); 
}

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

// context.fillRect(0, 0, 640, 640);  

loadImage('/images/game/tiles.png').then(image => {
    context.drawImage(image, 0 ,0, 16, 16, 0, 0, 16, 16);
})