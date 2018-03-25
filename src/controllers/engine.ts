import { Condition } from "../models/Condition";
import { Choice } from "../models/Choice";
import { ContextModel } from "../models/Context";
import { SequenceModel } from "../models/Sequence";
import { Consequence } from "../models/Consequence";
import { ConsequenceRules } from "./consequence.rules";
import { ConditionRules } from "./condition.rules";
import { IPersistanceAdapter } from "./persistance-adapter";

export class Engine {
    isConditionValid(condition: Condition, context: ContextModel): boolean {
        let consequenceCast: Consequence;
        switch (condition.type) {
            case "SkillCondition":
                return ConditionRules.applySkillCondition(condition, context);
            case "InventoryCondition":
                return ConditionRules.applyInventoryCondition(condition, context);
            case "RelationCondition":
                return ConditionRules.applyRelationCondition(condition, context);
            default:
                throw new Error("Unknown consequence");
        }
    }

    getValidConditions(conditions: Condition[], context: ContextModel): Condition[] {
        const valids: Condition[] = [];
        for (let condition of conditions) {
            if (this.isConditionValid(condition, context)) {
                valids.push(condition);
            }
        }

        return valids;
    }

    isChoiceValid(choice: Choice, context: ContextModel): Boolean {
        for (let condition of choice.conditions) {
            if (!this.isConditionValid(condition, context)) {
                return false;
            }
        }

        return true;
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
        if (consequence.conditions) {
            for (let condition of consequence.conditions) {
                if (!this.isConditionValid(condition, context)) {
                    return false;
                }
            }
        }

        return true;
    }

    getValidConsequences(consequences: Consequence[], context: ContextModel): Consequence[] {
        const valids: Consequence[] = [];

        for (let consequence of consequences) {
            if (this.isConsequenceValid(consequence, context)) {
                valids.push(consequence);
            }
        }

        return valids;
    }

    async applyConsequences(consequences: Consequence[], context: ContextModel, persistance: IPersistanceAdapter): Promise<ContextModel> {
        for (let consequence of consequences) {
            if (this.isConsequenceValid(consequence, context)) {
                let consequenceCast: Consequence;
                switch (consequence.type) {
                    case "SkillConsequence":
                        context = ConsequenceRules.applySkillConsequence(consequence, context);
                        break;
                    case "InventoryConsequence":
                        context = ConsequenceRules.applyInventoryConsequence(consequence, context);
                        break;
                    case "RelationConsequence":
                        context = ConsequenceRules.applyRelationConsequence(consequence, context);
                        break;
                    case "SequenceTransitionConsequence":
                        context = await ConsequenceRules.applySequenceTransitionConsequence(consequence, context, persistance);
                        break;
                    default:
                        throw new Error("Unknown consequence");
                }
            }
        }
        return context;
    }
}