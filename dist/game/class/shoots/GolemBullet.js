import { getImage, getAudio, extractImgFromSprite } from "../../usefull/functions.js";
import { Shoot } from "./Shoots.js";
export class GolemBullet extends Shoot {
    constructor(x, y, dir) {
        super(x, y, 17, 7, dir, 4, 0.1, extractImgFromSprite(getImage('golem-bullet-sprite'), 260, 30, 35, 14), getAudio('golem-bullet-audio'));
    }
    cooldown = 0; // Ne sert a rien puisque tiré par le golem et pas le joueur
    update(deltaTime) {
        this.speed += 0.001; // px / ms^2
        this.dir += 0.01; // rad / ms^2
        super.update(deltaTime);
    }
}
