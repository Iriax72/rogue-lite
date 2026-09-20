import { getImage } from "../../functions.js";

import { Loot } from "./Loot.js";
import { Game } from "../Game.js";
import { Player } from "../Player.js";

export class GoldBag extends Loot {
    constructor(game: Game, x: number, y: number, value: number) {
        super(
            game,
            x, y,
            value,
            getImage('gold-bag-img')
        );
    }

    public pickup(player: Player): void {
        player.gold += this.value;
        this.game.loots = this.game.loots.filter((loot) => loot !== this);
    }
}