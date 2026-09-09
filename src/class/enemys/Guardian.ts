import {Enemy} from "./Enemy.js";
import { Arrow } from "../shoots/Arrow.js";

export class Guardian extends Enemy {
    constructor(x: number, y: number, dropLoot: Function, shoots: Arrow[]) {
        super(
            x, y, 
            20, 30,
            50,
            30,
            document.querySelector('img#guardian-img'),
            dropLoot,
            shoots
        )
    }
}