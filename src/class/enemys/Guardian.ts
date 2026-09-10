import { getImage } from "../../functions.js";

import {Enemy} from "./Enemy.js";
import { Arrow } from "../shoots/Arrow.js";

export class Guardian extends Enemy {
    constructor(x: number, y: number, dropLoot: Function, shoots: Arrow[]) {
        super(
            x, y, 
            20, 30,
            50,
            30,
            getImage('guardian-img'),
            dropLoot,
            shoots
        )
    }

    protected move (deltaTime: number): void {}
}