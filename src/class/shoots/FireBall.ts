import { getImage } from "../../functions.js";

import { Shoot } from "./Shoots.js";

export class FireBall extends Shoot {
    constructor (x: number, y: number, dir: number) {
        super(
            x, y,
            10, 10,
            dir,
            5, 0.17,
            getImage('fire-ball-img')
        );
    }

    override readonly cooldown = 2000;
}