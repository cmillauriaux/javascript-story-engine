import { Condition } from "../models/Condition";
import { ContextModel } from "../models/Context";

export module ConditionRules {

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

    export function applyCaracteristicCondition(condition: Condition, context: ContextModel): boolean {
        if (!context.caractertistics) {
            return false;
        }
        const caracteristic: number = context.caractertistics.get(condition.attribute);

        if (caracteristic !== undefined && condition.exists) {
            return true;
        }

        if (condition.equal && condition.value === caracteristic) {
            return true;
        }

        if (condition.superior && caracteristic > condition.value) {
            return true;
        }

        if (condition.inferior && caracteristic < condition.value) {
            return true;
        }

        return false;
    }

    export function applyRelationCondition(condition: Condition, context: ContextModel): boolean {
        return true;
    }
}