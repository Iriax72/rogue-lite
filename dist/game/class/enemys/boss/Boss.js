import { BaseEnemy } from "../BaseEnemy.js";
import { ManaBottle } from "../../loots/ManaBottle.js";
import { GoldBag } from "../../loots/GoldBag.js";
export class Boss extends BaseEnemy {
    loot;
    player;
    max_hp;
    currentPhase;
    currentPhaseIndex = 0;
    phaseTransitions;
    constructor(x, y, width, height, health, image, loot, dropLootFunc, phaseConfig, player) {
        super(x, y, width, height, health, image, dropLootFunc);
        this.loot = loot;
        this.player = player;
        this.max_hp = health;
        this.currentPhase = phaseConfig.initialPhase();
        this.phaseTransitions = phaseConfig.transitions;
        this.currentPhase.enter(this);
    }
    update(_deltaTime) {
        // Check damages
        this.player.shoots.forEach(shoot => {
            if (this.collides(shoot.getRect())) {
                this.health -= shoot.strength;
                this.player.shoots = this.player.shoots.filter(s => s !== shoot);
            }
        });
        if (this.health <= 0) {
            this.die();
            return;
        }
        // Check phase change
        const healthPercent = this.health / this.max_hp;
        let targetPhaseIndex = this.currentPhaseIndex;
        for (let index = this.currentPhaseIndex; index < this.phaseTransitions.length; index++) {
            const transition = this.phaseTransitions[index];
            if (healthPercent > transition.healthPercent)
                break;
            targetPhaseIndex = index + 1;
        }
        if (targetPhaseIndex > this.currentPhaseIndex) {
            const transition = this.phaseTransitions[targetPhaseIndex - 1];
            this.currentPhase = transition.createPhase();
            this.currentPhaseIndex = targetPhaseIndex;
            this.currentPhase.enter(this);
        }
    }
    attackPhase() {
        this.currentPhase.attack(this);
    }
    die() {
        if (this.isDead)
            return;
        this.dropLoots();
        this.isDead = true;
    }
    dropLoots() {
        for (let amount = this.loot.gold; amount > 0; amount -= 5) {
            this.dropLootFunc(GoldBag, this.x + Math.random() * this.width, this.y + Math.random() * this.height, Math.min(amount, 5));
        }
        for (let amount = this.loot.mana; amount > 0; amount -= 3) {
            this.dropLootFunc(ManaBottle, this.x + Math.random() * this.width, this.y + Math.random() * this.height, Math.min(amount, 3));
        }
    }
}
