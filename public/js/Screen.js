import {Vector} from './math.js'

export default class Screen {
    constructor() {
        this.position = new Vector(0, 0);
        this.size = new Vector(256, 224);
    }
}