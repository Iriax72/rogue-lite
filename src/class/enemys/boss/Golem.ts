import { getImage, extractImgFromSprite } from "../../../functions.js";

import { Boss, type BossPhase } from "./Boss.js";
import type { LootConstructor } from "../../loots/Loot.js";

export class Golem extends Boss {
    constructor(
        x: number,
        y: number,
        dropLootFunc: (lootConstructor: LootConstructor, x: number, y: number, value: number) => void
    ) {
        const img = getImage("golem-sprite");
        const phaseConfig = {
            initialPhase: () => new Phase1(),
            transitions: [
                {healthPercent: 0.5, createPhase: () => new Phase2()}
            ]
        };
        super(
            x, y,
            130, 130,
            100,
            extractImgFromSprite(img, 0, 0, 100, 100),
            {gold: 100, mana: 30},
            dropLootFunc,
            phaseConfig
        );
    }

    public move(_deltaTime: number): void {
    }
}

class Phase1 implements BossPhase {
    name = "Phase 1"

    update(boss: Boss, deltaTime: number): void {
        boss
        deltaTime
    }

    enter(boss: Boss) {
        boss
    }
}

class Phase2 implements BossPhase {
    name = "Phase 2"

    update(boss: Boss, deltaTime: number): void {
        boss
        deltaTime
    }

    enter(boss: Boss) {
        boss
    }
}