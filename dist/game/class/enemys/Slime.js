import { getImage } from "../../usefull/functions.js";
import { Vector2D } from "../../usefull/geometry.js";
import { Player } from "../Player.js";
import { Enemy } from "./Enemy.js";
export class Slime extends Enemy {
    moveStart;
    moveEnd;
    allerRetour = true;
    speed = 0.02; // px / ms
    constructor(x, y, dropLoot, player, moveStart, moveEnd) {
        super(x, y, 13, 8, 1, 1000, 5, 20, getImage('slime-img'), dropLoot, player);
        this.moveStart = moveStart;
        this.moveEnd = moveEnd;
    }
    move(deltaTime) {
        const aim = this.allerRetour ? this.moveEnd : this.moveStart;
        const dx = new Vector2D(aim.x - this.x, aim.y - this.y);
        const remainingDistance = dx.length();
        const distanceToMove = this.speed * deltaTime;
        if (remainingDistance === 0) {
            this.allerRetour = !this.allerRetour;
            return;
        }
        if (remainingDistance <= distanceToMove) {
            this.x = aim.x;
            this.y = aim.y;
            this.allerRetour = !this.allerRetour;
            return;
        }
        const direction = dx.normalize();
        this.x += direction.x * distanceToMove;
        this.y += direction.y * distanceToMove;
    }
}
