import { getImage } from "../../functions.ts";

import { Loot } from "./Loot.ts";
import { Game } from "../Game.ts";
import { Player } from "../Player.ts";

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