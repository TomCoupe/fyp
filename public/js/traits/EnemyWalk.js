import {Trait} from '../Entity.js';

export default class EnemyWalk extends Trait {
    constructor() {
        super('enemyWalk');
    
        this.direction = 1;
        this.speed = 5000;
        this.distance = 0;
        this.directionFacing = 1;
        this.lastPos = 0;
    }

    getDirection() {
        if(this.direction == 1) {
            return -1;
        }
        return 1;
    }

    checkDirection(entity) {
        if(this.direction = 1) {
            if (entity.pos.x > this.lastPos) {
                return true;
            }
            return false; 
        }
        if(this.direction -1) {
            if(entity.pos.x <= this.lastPos) {
                return true;
            }
            return false;
        }
        
    }

    update(entity, deltaTime) {
        // console.log(this.direction)
        // console.log(entity.pos.x, this.lastPos)

        console.log(this.checkDirection(entity))
        entity.vel.x = this.speed * this.direction * deltaTime;
        if (entity.pos.x > this.lastPos) {
            console.log('test');
            // console.log(entity.pos.x, this.lastPos)
            // console.log(this.distance);
            // this.directionFacing = this.direction;
            this.distance += Math.abs(entity.vel.x * deltaTime);
        } else if (entity.pos.x <= lastPos)
        else {
            console.log('das')
            this.direction = this.getDirection(); 
        }

        this.lastPos = entity.pos.x;
    }
}