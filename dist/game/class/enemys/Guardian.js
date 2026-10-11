import { getImage } from "../../usefull/functions.js";
import { Player } from "../Player.js";
import { Enemy } from "./Enemy.js";
export class Guardian extends Enemy {
    constructor(x, y, dropLoot, player) {
        super(x, y, 20, 30, 4, 500, 30, 50, getImage('guardian-img'), dropLoot, player);
    }
    move(deltaTime) {
        deltaTime;
    }
}
