export default class Game {
    constructor() {
        this.layers = [];
    }

    draw(context, screen) {
        this.layers.forEach(layer => {
            // console.log(layer);
            layer(context, screen);
        });
    }
}
