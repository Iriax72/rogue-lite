import { Game } from "../Game";
import { Player } from "../Player";

export class Loot {
    game: Game;
    x: number;
    y: number;
    value: number;
    image: HTMLImageElement;
    WIDTH = 15;
    HEIGHT = 15;

    constructor (game: Game, x: number, y: number, value: number, image: HTMLImageElement) {
        this.game = game
        this.x = x;
        this.y = y;
        this.value = value;
        this.image = image;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.WIDTH,
            this.HEIGHT
        );
    }

    pickup(player: Player): void {
        player.gold += this.value;
        this.game.loots = this.game.loots.filter((loot) => loot !== this)
    }
}