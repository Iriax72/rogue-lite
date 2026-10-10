import { assertDefined } from "./functions.js";
export function rdm(proba) {
    if (proba >= Math.random() && proba !== 0) {
        return true;
    }
    return false;
}
export function choice(list) {
    if (list.length === 0) {
        throw new Error('choice() n\'accepte pas les listes vides');
    }
    const rdmElement = list[Math.floor(Math.random() * list.length)];
    assertDefined(rdmElement, 'Une erreur qui ne devrait pas survenir est survenue (usefull->random->choice)');
    return rdmElement;
}
