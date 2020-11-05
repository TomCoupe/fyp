 import { loadImage } from "/js/helpers.js";


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

context.fillRect(0, 0, 50, 50);  

loadImage('/images/game/tiles.png').then(image => {
    context.drawImage(image, 0, 0);
})