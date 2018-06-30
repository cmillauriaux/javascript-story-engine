import { Consequence } from "../models/Consequence";
import { ContextModel } from "../models/Context";
import { IPersistanceAdapter } from "./persistance-adapter";

export namespace ConsequenceRules {

    export function applySkillConsequence(consequence: Consequence, context: ContextModel): ContextModel {
        if (!context.skills) {
            context.skills = new Map<String, number>();
        }
        let actualValue: number = 0;
        if (!isNaN(context.skills.get(consequence.name))) {
            actualValue = context.skills.get(consequence.name);
        }
        if (consequence.bonus) {
            context.skills.set(consequence.name, actualValue + consequence.value);
        } else {
            context.skills.set(consequence.name, actualValue - consequence.value);
        }
        return context;
    }

    export function applyInventoryConsequence(consequence: Consequence, context: ContextModel): ContextModel {
        if (!context.inventory) {
            context.inventory = new Map<String, number>();
        }
        let actualValue: number = 0;
        if (!isNaN(context.inventory.get(consequence.name))) {
            actualValue = context.inventory.get(consequence.name);
        }
        if (consequence.bonus) {
            context.inventory.set(consequence.name, actualValue + consequence.value);
        } else {
            context.inventory.set(consequence.name, actualValue - consequence.value);
        }
        return context;
    }

    export function applyVariableConsequence(consequence: Consequence, context: ContextModel): ContextModel {
        if (!context.variables) {
            context.variables = new Map<String, any>();
        }
        context.variables.set(consequence.name, consequence.value);

        return context;
    }

    export function applyRelationConsequence(consequence: Consequence, context: ContextModel): ContextModel {
        return context;
    }

    // tslint:disable-next-line:max-line-length
    export async function applySequenceTransitionConsequence(consequence: Consequence, context: ContextModel, persistance: IPersistanceAdapter): Promise<ContextModel> {
        context.sequence = await persistance.getSequence(context.story.id, consequence.name);
        return context;
    }
}