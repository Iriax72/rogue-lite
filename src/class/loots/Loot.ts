import { Game } from "../Game.js";
import { Player } from "../Player.js";

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
}

export class Loot {
    private WIDTH = 15;
    private HEIGHT = 15;

    constructor (
        private game: Game,
        private x: number,
        private y: number,
        private value: number,
        private image: HTMLImageElement
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

    public pickup(player: Player): void {
        player.gold += this.value;
        this.game.loots = this.game.loots.filter((loot) => loot !== this)
    }
}