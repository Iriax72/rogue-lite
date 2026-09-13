import { getImage } from "../../functions.ts";

import { Player } from "../Player.ts";
import {Enemy} from "./Enemy.ts";

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