import type { Rect } from "../../functions.js";
import { collides } from "../../functions.js";

import type { LootConstructor } from "../loots/Loot.js";

import { Entity } from "../Entity.js";

export abstract class BaseEnemy extends Entity {
    public isDead: boolean = false;

    constructor(x: number, y: number, width: number, height: number,
        public health: number,
        private readonly image: HTMLImageElement,
        protected readonly dropLootFunc: (lootConstructor: LootConstructor, x: number, y: number, value: number) => void
    ) {
        super(x, y, width, height);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    public abstract update(deltaTime: number): void;

    // protected abstract move(deltaTime: number): void;

    protected abstract die(): void;

    protected collides(rect: Rect): boolean {
        return collides(this.getRect(), rect);
    }
}