import { getImage } from "../../functions.js";

import { Environnement } from "./Environnement.js";

export class Lamp extends Environnement {
    constructor (x: number, y: number) {
        super(x, y, 6, 12, getImage('lamp-img'))
    }
}