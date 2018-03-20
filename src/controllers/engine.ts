import { Condition } from "../models/Condition";
import { Choice } from "../models/Choice";
import { Consequence } from "../models/Consequence";
import { ContextModel } from "../models/Context";
import { SequenceModel } from "../models/Sequence";

export class Engine {
    isConditionValid(condition: Condition, context: ContextModel): Boolean {
        return true;
    }

    getValidConditions(conditions: Condition[], context: ContextModel): Condition[] {
        const valids: Condition[] = [];

        conditions.forEach(condition => {
            if (this.isConditionValid(condition, context)) {
                valids.push(condition);
            }
        });

        return valids;
    }

    getChoice(choices: Choice[], order: number): Choice {
        choices.forEach(choice => {
            if (choice.order === order) {
                return choice;
            }
        });
        throw new Error("Cannot retrieve choice");
    }

    isConsequenceValid(consequence: Consequence, context: ContextModel): Boolean {
        return true;
    }

    getValidConsequences(consequences: Consequence[], context: ContextModel): Consequence[] {
        const valids: Consequence[] = [];

        consequences.forEach(consequence => {
            if (this.isConsequenceValid(consequence, context)) {
                valids.push(consequence);
            }
        });

        return valids;
    }
}