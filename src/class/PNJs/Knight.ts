import { getImage } from "../../functions.js";

import { PNJ } from "./PNJ.js";
import { Player } from "../Player.js";
import { ATH } from "../ATH.js";
import { Inputs } from "../Inputs.js";

export class Knight extends PNJ {
    constructor(x: number, y: number, width: number, height: number, player: Player, ATH: ATH, inputs: Inputs) {
        super(x, y, width, height, getImage('knight-img'), player, ATH, inputs, [
            "Salutation, voyageur...",
            "Je suis le chevalier gris, craint et redouté par mes ennemis !",
            "Veux-tu mon épée ? Je te la cède pour 200 pièces d'or."
        ]);
    }
}