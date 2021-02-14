import {Vec2} from './math.js'

export default class Screen {
    constructor() {
        this.position = new Vec2(0, 0);
        this.size = new Vec2(256, 224);
    }
}