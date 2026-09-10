import { getImage } from "../../functions.js";

import {Enemy} from "./Enemy.js";
import { Arrow } from "../shoots/Arrow.js";

export class Slime extends Enemy {
    constructor(x: number, y: number, dropLoot: Function, shoots: Arrow[]) {
        super(
            x, y,
            13, 8,
            20, 5,
            getImage('slime-img'),
            dropLoot,
            shoots
        );
    }

    protected move(deltaTime: number): void {
        this.x += deltaTime / 250
    }
}