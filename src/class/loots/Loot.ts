import { Game } from "../Game.js";
import { Player } from "../Player.js";

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
}

export abstract class Loot {
    private readonly WIDTH = 15;
    private readonly HEIGHT = 15;

    constructor (
        protected readonly game: Game,
        private readonly x: number,
        private readonly y: number,
        protected readonly value: number,
        private readonly image: HTMLImageElement
    ) {}

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.WIDTH,
            this.HEIGHT
        );
    }

    public getRect(): Rect {
        return{
            x: this.x,
            y: this.y,
            w: this.WIDTH,
            h: this.HEIGHT
        }
    }

    public abstract pickup(player: Player): void
}