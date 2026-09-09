import { Arrow } from "../shoots/Arrow";

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
}

export class Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    health: number;
    lootValue: number;
    image: HTMLImageElement;
    dropLoot: Function;
    isDead = false;
    shoots: Arrow[];

    constructor (x: number, y: number, width: number, height: number, lootValue: number, health: number, image: HTMLImageElement, dropLoot: Function, shoots: Arrow[]) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
        this.lootValue = lootValue;
        this.image = image;
        this.dropLoot = dropLoot;
        this.shoots = shoots;
    }

    move(deltaTime: number): void {}

    update(deltaTime: number): void {
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

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    die(): void {
        if (this.isDead) {
            return;
        }
        this.dropLoot(this.x, this.y, this.lootValue);
        this.isDead = true;
    }

    collides(rect: Rect): boolean {
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