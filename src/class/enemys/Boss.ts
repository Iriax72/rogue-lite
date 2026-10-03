import { BaseEnemy } from "./BaseEnemy.js";

import type { LootConstructor } from "../loots/Loot.js";
import { ManaBottle } from "../loots/ManaBottle.js";
import { GoldBag } from "../loots/GoldBag.js";

export abstract class Boss extends BaseEnemy {
    protected phase: number = 1;
    
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        health: number,
        image: HTMLImageElement,
        private readonly loot: {gold: number, mana: number},
        dropLootFunc: (lootConstructor: LootConstructor, x: number, y: number, value: number) => void
    ) {
        super(x, y, width, height, health, image, dropLootFunc);
    }

    protected die(): void {
        if (this.isDead) return;

        this.dropLoots();
        this.isDead = true;
    }

    private dropLoots(): void {
        for (let amount = this.loot.gold; amount > 0; amount -= 5) {
            this.dropLootFunc(
                GoldBag,
                this.x + Math.random() * this.width,
                this.y + Math.random() * this.height,
                Math.min(amount, 5)
            );
        }
        for (let amount = this.loot.mana; amount > 0; amount -= 3) {
            this.dropLootFunc(
                ManaBottle,
                this.x + Math.random() * this.width,
                this.y + Math.random() * this.height,
                Math.min(amount, 3)
            );
        }
    }
}