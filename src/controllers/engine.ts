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
        for (let condition of conditions) {
            if (this.isConditionValid(condition, context)) {
                valids.push(condition);
            }
        };

        return valids;
    }

    getChoice(choices: Choice[], order: number): Choice {
        for (let choice of choices) {
            if (choice.order === order) {
                return choice;
            }
        }
        throw new Error("Cannot retrieve choice");
    }

    isConsequenceValid(consequence: Consequence, context: ContextModel): Boolean {
        return true;
    }

    getValidConsequences(consequences: Consequence[], context: ContextModel): Consequence[] {
        const valids: Consequence[] = [];

        for (let consequence of consequences) {
            if (this.isConsequenceValid(consequence, context)) {
                valids.push(consequence);
            }
        };

        return valids;
    }

    applyConsequences(consequences: Consequence[], context: ContextModel): ContextModel {
        for (let consequence of consequences) {
            if (this.isConsequenceValid(consequence, context)) {
                consequence.apply(context);
            }
        };
        return context;
    }
}