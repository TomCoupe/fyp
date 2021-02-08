import Compositor from './Compositor.js';
import { Matrix } from './math.js';
import TileCollision from './TileCollision.js';

export default class Level {
    constructor() {
        this.entities = new Set();
        this.comp = new Compositor();
        this.tileMatrix = new Matrix();

        this.tileCollision = new TileCollision(this.tileMatrix);

    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            this.tileCollision.testCollision(entity);
        })
    }
}

