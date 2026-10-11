import { getImage } from "../../usefull/functions.js";
import { PNJ } from "./PNJ.js";
import { Game } from "../Game.js";
import { Inputs } from "../Inputs.js";
export class Pnj1 extends PNJ {
    constructor(x, y, width, height, game, inputs) {
        super(x, y, width, height, getImage('pnj1-img'), game, inputs, [
            "Bondour monseigneur !",
            "Auriez-vous l'oblizance de me trouver une nouvelle pelle, la mienne f'est cassée...",
            "Merfi d'avance"
        ]);
    }
}
