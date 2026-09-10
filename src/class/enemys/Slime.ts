import { getImage } from "../../functions.js";

import { Player } from "../Player.js";
import {Enemy} from "./Enemy.js";
import { Arrow } from "../shoots/Arrow.js";

export class Slime extends Enemy {
    constructor(x: number, y: number, dropLoot: Function, player: Player) {
        super(
            x, y,
            13, 8,
            1, 1000,
            5,
            20,
            getImage('slime-img'),
            dropLoot,
            player,
        );
    }

    protected move(deltaTime: number): void {
        this.x += deltaTime / 250
    }
}