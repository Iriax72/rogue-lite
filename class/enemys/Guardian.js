import {Enemy} from "./Enemy.js";

export class Guardian extends Enemy {
    constructor(x, y, dropLoot, shoots) {
        super(
            x, y, 
            20, 30,
            50,
            30,
            document.querySelector('img#guardian-img'),
            dropLoot,
            shoots
        )
    }
}