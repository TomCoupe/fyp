import Game from './Game.js';
import { Matrix } from './math.js';
import TileCollision from './TileCollision.js';

export default class Level {
    constructor() {
        this.entities = new Set();
        this.game = new Game();
        this.tileMatrix = new Matrix();

        this.tileCollision = new TileCollision(this.tileMatrix);

    }

    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
            //Set position to the x velocity of the entity multiplied by deltaTime
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollision.checkPosX(entity);
            
            //Set position to the y velocity of the entity multiplied by deltaTime
            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollision.checkPosY(entity);

        })
    }
}

