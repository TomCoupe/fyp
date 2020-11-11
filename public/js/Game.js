
//this class is used to apply the sprite layers of the game.
export default class Game {

    constructor() {
        this.layers = [];
    }

    draw(context) {
        this.layers.forEach(layer => {
            layer(context)
        })
    }
}