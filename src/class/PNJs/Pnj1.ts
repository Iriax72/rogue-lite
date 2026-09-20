import { getImage } from "../../functions.js";

import { PNJ } from "./PNJ.js";
import { Player } from "../Player.js";
import { ATH } from "../ATH.js";
import { Inputs } from "../Inputs.js";

export class Pnj1 extends PNJ {
    constructor(x: number, y: number, width: number, height: number, player: Player, ATH: ATH, inputs: Inputs) {
        super(x, y, width, height, getImage('knight-img'), player, ATH, inputs, [
            "Bondour monseigneur !",
            "Auriez-vous l'oblizance de me trouver une nouvelle pelle, la mienne f'est cassée...",
            "Merfi d'avance"
        ]);
    }
}