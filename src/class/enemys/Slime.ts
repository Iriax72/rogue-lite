import { getImage, Vector2D } from "../../functions.js";

import { Player } from "../Player.js";
import {Enemy} from "./Enemy.js";

export class Slime extends Enemy {
    private allerRetour:boolean = true;
    private readonly speed: number = 0.02; // px / ms

    constructor(x: number, y: number, dropLoot: Function, player: Player,
        private readonly moveStart: Vector2D,
        private readonly moveEnd: Vector2D
    ) {
        super(
            x, y,
            13, 8,
            1, 1000,
            5,
            20,
            getImage('slime-img'),
            dropLoot,
            player,
        );
    }

    protected move(deltaTime: number): void {
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