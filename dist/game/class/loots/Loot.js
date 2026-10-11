import { Entity } from "../Entity.js";
import { Game } from "../Game.js";
import { Player } from "../Player.js";
export class Loot extends Entity {
    game;
    value;
    image;
    constructor(game, x, y, value, image) {
        super(x, y, 15, 15);
        this.game = game;
        this.value = value;
        this.image = image;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
