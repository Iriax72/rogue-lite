import { getImage } from "../../usefull/functions.js";
import { dist } from "../../usefull/geometry.js";

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
        return fireBalls.find(fireBall => dist(this.getRect(), fireBall.getRect()) === 0);
    }
}