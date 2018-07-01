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
            case "skill":
                return ConditionRules.applySkillCondition(condition, context);
            case "inventory":
                return ConditionRules.applyInventoryCondition(condition, context);
            case "variable":
                return ConditionRules.applyVariableCondition(condition, context);
            case "relation":
                return ConditionRules.applyRelationCondition(condition, context);
            default:
                throw new Error("Unknown condition");
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
        if (choice.conditions) {
            for (let condition of choice.conditions) {
                if (!this.isConditionValid(condition, context)) {
                    return false;
                }
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
        let passThroughConsequences : Consequence;
        for (let consequence of consequences) {
            if (this.isConsequenceValid(consequence, context)) {
                let consequenceCast: Consequence;
                switch (consequence.type) {
                    case "skill":
                        context = ConsequenceRules.applySkillConsequence(consequence, context);
                        break;
                    case "inventory":
                        context = ConsequenceRules.applyInventoryConsequence(consequence, context);
                        break;
                    case "variable":
                        context = ConsequenceRules.applyVariableConsequence(consequence, context);
                        break;
                    case "relation":
                        context = ConsequenceRules.applyRelationConsequence(consequence, context);
                        break;
                    case "text":
                        break;
                    case "sequence":
                        context = await ConsequenceRules.applySequenceTransitionConsequence(consequence, context, persistance);
                        // Manage with passtrough sequences
                        if (context.sequence.next) {
                            for (let conditionIdx in context.sequence.next) {
                                let condition = context.sequence.next[conditionIdx];
                                if (condition.type === "DefaultCondition" || this.isConditionValid(condition, context)) {
                                    passThroughConsequences = {
                                        type: "sequence",
                                        name: conditionIdx
                                    };
                                    break;
                                }
                            }
                        }
                        break;
                    default:
                        throw new Error("Unknown consequence");
                }
            }
        }

        if (passThroughConsequences) {
            return this.applyConsequences([passThroughConsequences], context, persistance);
        }

        return context;
    }

    getEntryPoint(entrypoints: Map<String, Condition>, context: ContextModel): string {
        let defaut: string = "";
        if (entrypoints) {
            for (let entrypoint in entrypoints) {
                if (entrypoints.hasOwnProperty(entrypoint)) {
                    let condition: Condition = entrypoints[entrypoint];
                    if (condition.type === "Default") {
                        defaut = entrypoint;
                    } else {
                        if (this.isConditionValid(condition, context)) {
                            return entrypoint;
                        }
                    }
                }
            }
        }
        return defaut;
    }
}