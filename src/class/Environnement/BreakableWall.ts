import { getImage, collides } from "../../functions.js";

import { Environnement } from "./Environnement.js";
import { FireBall } from "../shoots/FireBall.js";

export class BreakableWall extends Environnement {
    constructor(x: number, y: number, TILE_SIZE: number) {
        super(
            x, y,
            TILE_SIZE, TILE_SIZE,
            getImage('breakable-wall-img')
        );
    }

    public collidesFireBall(fireBalls: FireBall[]): FireBall | undefined {
        return fireBalls.find(fireBall => collides(this.getRect(), fireBall.getRect()));
    }
}