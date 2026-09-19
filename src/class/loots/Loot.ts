import { Entity } from "../Entity.js";
import { Game } from "../Game.js";
import { Player } from "../Player.js";

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
}

export abstract class Loot extends Entity {
    constructor (
        protected readonly game: Game,
        x: number,
        y: number,
        protected readonly value: number,
        private readonly image: HTMLImageElement
    ) {
        super(x, y, 15, 15);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    public abstract pickup(player: Player): void
}