import { getImage, getAudio, extractImgFromSprite } from "../../functions.js";

import { Shoot } from "./Shoots.js";

export class GolemBullet extends Shoot {
    constructor(x: number, y: number, dir: number) {
        super(
            x, y,
            9, 4,
            dir,
            4, 0.1,
            extractImgFromSprite(getImage('golem-bullet-sprite'), 200, 0, 100, 100),
            getAudio('golem-bullet-audio'));
    }

    override readonly cooldown = 0; // Ne sert a rien puisque tiré par le golem et pas le joueur

    override update(deltaTime: number) {
        this.speed += 0.001; // px / ms^2
        this.dir += 0.01; // rad / ms^2
        super.update(deltaTime);
    }
}