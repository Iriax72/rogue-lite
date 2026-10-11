import { getImage } from "../../usefull/functions.js";
import { Loot } from "./Loot.js";
import { Game } from "../Game.js";
import { Player } from "../Player.js";
export class ManaBottle extends Loot {
    constructor(game, x, y, value) {
        super(game, x, y, value, getImage('mana-bottle-img'));
    }
    pickup(player) {
        player.mana += this.value;
        this.game.loots = this.game.loots.filter((loot) => loot !== this);
    }
}
