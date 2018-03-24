import { Consequence } from "../models/Consequence";
import { ContextModel } from "../models/Context";
import { Persistance } from "./persistance";

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

    export function applyRelationConsequence(consequence: Consequence, context: ContextModel): ContextModel {
        return context;
    }

    export async function applySequenceTransitionConsequence(consequence: Consequence, context: ContextModel): Promise<ContextModel> {
        context.sequence = await new Persistance("example").getSequence(context.story.id, consequence.name);
        return context;
    }
}