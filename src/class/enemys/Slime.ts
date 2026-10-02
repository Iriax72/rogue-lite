import { getImage, dist, Vector2D} from "../../functions.js";

import { Player } from "../Player.js";
import {Enemy} from "./Enemy.js";

export class Slime extends Enemy {
    private allerRetour:boolean = true;
    private readonly speed: number = 0.05; // px / ms

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
        
        let dir: Vector2D = new Vector2D(
            aim.x - this.getRect().x,
            aim.y - this.getRect().y
        ).normalize();

        this.x += dir.x * this.speed * deltaTime;
        this.y += dir.y * this.speed * deltaTime;

        if (dist(this.getRect(), aim.toRect()) < 1) {
            this.allerRetour = !this.allerRetour;
        }
    }
}