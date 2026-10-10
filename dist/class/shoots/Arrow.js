import { getImage, getAudio } from "../../usefull/functions.js";
import { Shoot } from "./Shoots.js";
export class Arrow extends Shoot {
    constructor(x, y, dir) {
        super(x, y, 15, 5, dir, 3, 0.3, getImage('arrow-img'), getAudio('arrow-audio'));
    }
    cooldown = 1500;
}
