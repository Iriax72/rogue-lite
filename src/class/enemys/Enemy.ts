import type { Player } from "../Player.js";
import { Arrow } from "../shoots/Arrow.js";

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
}

export abstract class Enemy {
    public isDead: boolean = false;
    private currentCooldown = 0;

    constructor (
        protected x: number,
        protected y: number,
        protected readonly width: number,
        protected readonly height: number,
        protected readonly strength: number,
        protected readonly cooldown: number,
        public health: number,
        protected readonly lootValue: number,
        protected readonly image: HTMLImageElement,
        protected readonly dropLoot: Function,
        protected readonly player: Player,
    ) {}

    protected abstract move(deltaTime: number): void

    public update(deltaTime: number): void {
        this.player.arrows.forEach((shoot: Arrow): void => {
            if (this.collides(shoot.getRect())) {
                this.health -= shoot.strength;
                this.player.arrows.filter(s => s !== shoot);
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

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    protected die(): void {
        if (this.isDead) {
            return;
        }
        this.dropLoot(this.x, this.y, this.lootValue);
        this.isDead = true;
    }

    protected collides(rect: Rect): boolean {
        if (this.x + this.width < rect.x) {
            return false;
        }
        if (this.x > rect.x + rect.w) {
            return false;
        }
        if (this.y + this.height < rect.y) {
            return false;
        }
        if (this.y > rect.y + rect.h) {
            return false;
        }
        return true;
    }
}