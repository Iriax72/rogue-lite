import { BaseEnemy } from "./BaseEnemy.js";
import { GoldBag } from "../loots/GoldBag.js";
import { Shoot } from "../shoots/Shoots.js";
export class Enemy extends BaseEnemy {
    strength;
    cooldown;
    goldValue;
    player;
    currentCooldown = 0;
    constructor(x, y, width, height, strength, cooldown, health, goldValue, image, dropLootFunc, player) {
        super(x, y, width, height, health, image, dropLootFunc);
        this.strength = strength;
        this.cooldown = cooldown;
        this.goldValue = goldValue;
        this.player = player;
    }
    update(deltaTime) {
        this.player.shoots.forEach((shoot) => {
            if (this.collides(shoot.getRect())) {
                this.health -= shoot.strength;
                this.player.shoots = this.player.shoots.filter(s => s !== shoot);
            }
        });
        if (this.health <= 0) {
            this.die();
            return;
        }
        this.move(deltaTime);
        if (this.currentCooldown <= 0 && this.collides(this.player.getRect())) {
            this.player.hurt(this.strength);
            this.currentCooldown = this.cooldown;
        }
        else {
            this.currentCooldown -= deltaTime;
            if (this.currentCooldown < 0) {
                this.currentCooldown = 0;
            }
        }
    }
    die() {
        if (this.isDead)
            return;
        this.dropLootFunc(GoldBag, this.x, this.y, this.goldValue);
        this.isDead = true;
    }
}
