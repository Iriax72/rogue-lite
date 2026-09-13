import { getImage } from "../../functions.ts";

import { Loot } from "./Loot.ts";
import { Game } from "../Game.ts";
import { Player } from "../Player.ts";

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