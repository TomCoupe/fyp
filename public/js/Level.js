import Compositor from './Compositor.js';

export default class Level {
    constructor() {
        this.entities = new Set();
        this.comp = new Compositor();
    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
        })
    }
}

