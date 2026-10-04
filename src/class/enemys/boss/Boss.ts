import { BaseEnemy } from "../BaseEnemy.js";

import type { LootConstructor } from "../../loots/Loot.js";
import { ManaBottle } from "../../loots/ManaBottle.js";
import { GoldBag } from "../../loots/GoldBag.js";

export interface BossPhase {
    name: string
    update: (boss: Boss, deltaTime: number) => void
    enter: (boss: Boss) => void
}

export interface BossPhaseTransition {
    healthPercent: number
    createPhase: () => BossPhase
}

export interface BossPhaseConfig {
    initialPhase: () => BossPhase
    transitions: readonly BossPhaseTransition[]
}

export abstract class Boss extends BaseEnemy {
    protected readonly max_hp: number;
    private currentPhase: BossPhase;
    private currentPhaseIndex = 0;
    private readonly phaseTransitions: readonly BossPhaseTransition[];

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        health: number,
        image: HTMLImageElement,
        private readonly loot: {gold: number, mana: number},
        dropLootFunc: (lootConstructor: LootConstructor, x: number, y: number, value: number) => void,
        phaseConfig: BossPhaseConfig
    ) {
        super(x, y, width, height, health, image, dropLootFunc);
        this.max_hp = health;
        this.currentPhase = phaseConfig.initialPhase();
        this.phaseTransitions = phaseConfig.transitions;
        this.currentPhase.enter(this);
    }

    public update(deltaTime: number): void {
        const healthPercent = this.health / this.max_hp;
        let targetPhaseIndex = this.currentPhaseIndex;

        for (let index = this.currentPhaseIndex; index < this.phaseTransitions.length; index++) {
            const transition = this.phaseTransitions[index]!;
            if (healthPercent > transition.healthPercent) break;
            targetPhaseIndex = index + 1;
        }

        if (targetPhaseIndex > this.currentPhaseIndex) {
            const transition = this.phaseTransitions[targetPhaseIndex - 1]!;
            this.currentPhase = transition.createPhase();
            this.currentPhaseIndex = targetPhaseIndex;
            this.currentPhase.enter(this);
        }

        this.currentPhase.update(this, deltaTime);
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