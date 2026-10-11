import { BaseEnemy } from "./BaseEnemy.js";

import type { LootConstructor } from "../loots/Loot.js";
import { GoldBag } from "../loots/GoldBag.js";
import type { Player } from "../Player.js";
import { Shoot } from "../shoots/Shoots.js";

export abstract class Enemy extends BaseEnemy {
    private currentCooldown = 0;

    constructor (
        x: number,
        y: number,
        width: number,
        height: number,
        private readonly strength: number,
        private readonly cooldown: number,
        health: number,
        private readonly goldValue: number,
        image: HTMLImageElement,
        dropLootFunc: (lootConstructor: LootConstructor, x: number, y: number, value: number) => void,
        private readonly player: Player,
    ) {
        super(x, y, width, height, health, image, dropLootFunc);
    }

    protected abstract move(deltaTime: number): void

    public update(deltaTime: number): void {
        this.player.shoots.forEach((shoot: Shoot): void => {
            if (this.collides(shoot.getRect())) {
                this.health -= shoot.strength;
                this.player.shoots = this.player.shoots.filter(s => s !== shoot);
            }
        })
        if (this.health <= 0) {
            this.die();
            return;
        }
        this.move(deltaTime);

        if (this.currentCooldown <= 0 && this.collides(this.player.getRect())) {
            this.player.hurt(this.strength);
            this.currentCooldown = this.cooldown;
        } else {
            this.currentCooldown -= deltaTime;
            if (this.currentCooldown < 0) {
                this.currentCooldown = 0;
            }
        }
    }

    protected die(): void {
        if (this.isDead) return;
        
        this.dropLootFunc(GoldBag, this.x, this.y, this.goldValue);
        this.isDead = true;
    }
}