import Compositor from './Compositor.js';
import {Matrix} from './math.js';

export default class Level {
    constructor() {
        this.entities = new Set();
        this.comp = new Compositor();
        this.tileMatrix = new Matrix();
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
        })
    }
}

