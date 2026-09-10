import { Arrow } from "../shoots/Arrow.js";

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
}

export abstract class Enemy {
    isDead: boolean = false;

    constructor (
        protected x: number,
        protected y: number,
        protected width: number,
        protected height: number,
        protected lootValue: number,
        public health: number,
        protected image: HTMLImageElement,
        protected dropLoot: Function,
        protected shoots: Arrow[]
    ) {}

    protected abstract move(deltaTime: number): void

    public update(deltaTime: number): void {
        this.shoots.forEach((shoot: Arrow): void => {
            if (this.collides(shoot.getRect())) {
                this.health -= shoot.strength;
                this.shoots.filter(s => s !== shoot);
            }
        })
        if (this.health <= 0) {
            this.die();
            return;
        }
        this.move(deltaTime);
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