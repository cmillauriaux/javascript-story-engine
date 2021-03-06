import { Condition } from "../models/Condition";
import { ContextModel } from "../models/Context";

export namespace ConditionRules {

    export function applySkillCondition(condition: Condition, context: ContextModel): boolean {
        if (!context.skills) {
            return false;
        }
        const skill: number = context.skills.get(condition.attribute);

        if (skill !== undefined && condition.exists) {
            return true;
        }

        if (condition.equal && condition.value === skill) {
            return true;
        }

        if (condition.superior && skill > condition.value) {
            return true;
        }

        if (condition.inferior && skill < condition.value) {
            return true;
        }

        return false;
    }

    export function applyInventoryCondition(condition: Condition, context: ContextModel): boolean {
        if (!context.inventory) {
            return false;
        }
        const inventory: number = context.inventory.get(condition.attribute);

        if (inventory !== undefined && condition.exists) {
            return true;
        }

        if (condition.equal && condition.value === inventory) {
            return true;
        }

        if (condition.superior && inventory > condition.value) {
            return true;
        }

        if (condition.inferior && inventory < condition.value) {
            return true;
        }

        return false;
    }

    export function applyVariableCondition(condition: Condition, context: ContextModel): boolean {
        if (!context.variables) {
            return false;
        }
        const variable: number = context.variables.get(condition.attribute);

        if (variable !== undefined && condition.exists) {
            return true;
        }

        if (variable === undefined && condition.not) {
            return true;
        }

        if (condition.equal && condition.value === variable) {
            return true;
        }

        if (condition.not && condition.value !== variable) {
            return true;
        }

        if (condition.superior && variable > condition.value) {
            return true;
        }

        if (condition.inferior && variable < condition.value) {
            return true;
        }

        return false;
    }

    export function applyRelationCondition(condition: Condition, context: ContextModel): boolean {
        return true;
    }
}