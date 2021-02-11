export default class Game {
    constructor() {
        this.layers = [];
    }

    draw(context, screen) {
        this.layers.forEach(layer => {
            layer(context, screen);
        });
    }
}
