import { getImage, getAudio } from "../../usefull/functions.js";
import { Shoot } from "./Shoots.js";
export class FireBall extends Shoot {
    constructor(x, y, dir) {
        super(x, y, 10, 10, dir, 5, 0.17, getImage('fire-ball-img'), getAudio('fire-ball-audio'));
    }
    cooldown = 2000;
}
