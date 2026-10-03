import { getImage } from "../../functions.js";
import type { LootConstructor } from "../loots/Loot.js";

import { Player } from "../Player.js";
import {Enemy} from "./Enemy.js";

export class Guardian extends Enemy {
    constructor(x: number, y: number, dropLoot: (lootConstructor: LootConstructor, x: number, y: number, value: number) => void, player: Player) {
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