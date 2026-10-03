import { getImage, extractImgFromSprite} from "../../functions.js";

import { Boss } from "./Boss.js";
import type { LootConstructor } from "../loots/Loot.js";

export class Golem extends Boss {
    constructor(
        x: number,
        y: number,
        dropLootFunc: (lootConstructor: LootConstructor, x: number, y: number, value: number) => void
    ) {
        const img = getImage("golem-sprite");
        super(
            x, y,
            150, 150,
            100,
            extractImgFromSprite(img, 0, 0, 100, 100),
            {gold: 100, mana: 30},
            dropLootFunc
        )
    }

    public update(deltaTime: number): void {
        deltaTime
    }

    public move(deltaTime: number): void {
        deltaTime
    }
}