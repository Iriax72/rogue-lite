import { getImage, dist } from "../../functions.js";

import { Player } from "../Player.js";
import {Enemy} from "./Enemy.js";

type coordinate = {
    x: number,
    y: number
}

export class Slime extends Enemy {
    private allerRetour:boolean = true;
    private readonly speed: number = 0.05; // px / ms

    constructor(x: number, y: number, dropLoot: Function, player: Player,
        private readonly moveStart: coordinate,
        private readonly moveEnd: coordinate
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
        
        let dir: coordinate = {
            x: aim.x - this.getRect().x,
            y: aim.y - this.getRect().y
        };
        dir = {
            x: dir.x / Math.sqrt(dir.x **2 + dir.y **2),
            y: dir.y / Math.sqrt(dir.x **2 + dir.y **2)
        };

        this.x += dir.x * this.speed * deltaTime;
        this.y += dir.y * this.speed * deltaTime;

        if (dist(this.getRect(), {x: aim.x, y: aim.y, w:0, h:0}) < 1) {
            this.allerRetour = !this.allerRetour;
        }
    }
}