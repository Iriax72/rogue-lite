import {Enemy} from "./Enemy.js";

export class Slime extends Enemy {
    constructor(x, y, shoots) {
        super(
            x, y,
            13, 8,
            20, 5,
            document.querySelector('img#slime-img'),
            shoots
        );
    }

    move(deltaTime) {
        this.x += deltaTime / 250
    }
}