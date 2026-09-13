import { getImage } from "../../functions.ts";

import { Player } from "../Player.ts";
import {Enemy} from "./Enemy.ts";

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

    protected move (deltaTime: number): void {
        deltaTime
    }
}