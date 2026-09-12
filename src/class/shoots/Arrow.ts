import { getImage } from "../../functions.js";

import { Shoot } from "./Shoots";

export class Arrow extends Shoot {
    constructor (x: number, y: number, dir: number) {
        super(
            x, y,
            15, 5,
            dir,
            3, 0.3,
            getImage('arrow-img')
        );
    }

    override readonly cooldown = 1500;
}