import { getImage } from "../../usefull/functions.js";
import { dist } from "../../usefull/geometry.js";
import { Environnement } from "./Environnement.js";
import { FireBall } from "../shoots/FireBall.js";
export class BreakableWall extends Environnement {
    constructor(x, y, TILE_SIZE) {
        super(x, y, TILE_SIZE, TILE_SIZE, getImage('breakable-wall-img'));
    }
    collidesFireBall(fireBalls) {
        return fireBalls.find(fireBall => dist(this.getRect(), fireBall.getRect()) === 0);
    }
}
