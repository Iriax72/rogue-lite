import { getImage } from "../../functions.js";

import { Player } from "../Player.js";
import {Enemy} from "./Enemy.js";
import { Arrow } from "../shoots/Arrow.js";

export class Guardian extends Enemy {
    constructor(x: number, y: number, dropLoot: Function, player: Player) {
        super(
            x, y, 
            20, 30,
            4, 500,
            30,
            50,
            getImage('guardian-img'),
            dropLoot,
            player,
        )
    }

    protected move (deltaTime: number): void {}
}