import { getImage } from "../../usefull/functions.js";
import { Environnement } from "./Environnement.js";
export class Lamp extends Environnement {
    constructor(x, y) {
        super(x, y, 6, 12, getImage('lamp-img'));
    }
}
