import {Enemy} from "./Enemy.js";

export class Slime extends Enemy {
    constructor(x, y, dropLoot, shoots) {
        super(
            x, y,
            13, 8,
            20, 5,
            document.querySelector('img#slime-img'),
            dropLoot,
            shoots
        );
    }

    move(deltaTime) {
        this.x += deltaTime / 250
    }
}