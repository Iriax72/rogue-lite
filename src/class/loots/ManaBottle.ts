import { getImage } from "../../functions.js";

import { Loot } from "./Loot";
import { Game } from "../Game.js";
import { Player } from "../Player.js";

export class ManaBottle extends Loot {
    constructor(game: Game, x: number, y: number, value: number) {
        super(
            game,
            x,
            y,
            value,
            getImage('mana-bottle-img')
        );
    }

    public pickup(player: Player): void {
        player.mana += this.value;
        this.game.loots = this.game.loots.filter((loot) => loot !== this);
    }
}