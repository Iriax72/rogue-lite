import { BaseEnemy } from "../BaseEnemy.js";

import type { LootConstructor } from "../../loots/Loot.js";
import { ManaBottle } from "../../loots/ManaBottle.js";
import { GoldBag } from "../../loots/GoldBag.js";
import type { Player } from "../../Player.js";

export interface BossPhase<TBoss extends BaseEnemy = Boss> {
    name: string
    update: (boss: TBoss, deltaTime: number) => void
    enter: (boss: TBoss) => void
    move: (boss: TBoss, deltaTime: number) => void
}

export interface BossPhaseTransition<TBoss extends BaseEnemy = Boss> {
    healthPercent: number
    createPhase: () => BossPhase<TBoss>
}

export interface BossPhaseConfig<TBoss extends BaseEnemy = Boss> {
    initialPhase: () => BossPhase<TBoss>
    transitions: readonly BossPhaseTransition<TBoss>[]
}

export abstract class Boss<TBoss extends BaseEnemy = BaseEnemy> extends BaseEnemy {
    protected readonly max_hp: number;
    private currentPhase: BossPhase<TBoss>;
    private currentPhaseIndex = 0;
    private readonly phaseTransitions: readonly BossPhaseTransition<TBoss>[];

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        health: number,
        image: HTMLImageElement,
        private readonly loot: {gold: number, mana: number},
        dropLootFunc: (lootConstructor: LootConstructor, x: number, y: number, value: number) => void,
        phaseConfig: BossPhaseConfig<TBoss>,
        private readonly player: Player
    ) {
        super(x, y, width, height, health, image, dropLootFunc);
        this.max_hp = health;
        this.currentPhase = phaseConfig.initialPhase();
        this.phaseTransitions = phaseConfig.transitions;
        this.currentPhase.enter(this as unknown as TBoss);
    }

    public update(deltaTime: number): void {
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
            const transition = this.phaseTransitions[index]!;
            if (healthPercent > transition.healthPercent) break;
            targetPhaseIndex = index + 1;
        }

        if (targetPhaseIndex > this.currentPhaseIndex) {
            const transition = this.phaseTransitions[targetPhaseIndex - 1]!;
            this.currentPhase = transition.createPhase();
            this.currentPhaseIndex = targetPhaseIndex;
            this.currentPhase.enter(this as unknown as TBoss);
        }

        this.currentPhase.update(this as unknown as TBoss, deltaTime);
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