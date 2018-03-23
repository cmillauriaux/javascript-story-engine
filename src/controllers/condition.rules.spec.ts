import { ContextModel } from "../models/Context";
import { Condition } from "../models/Condition";
import { ConditionRules } from "./condition.rules";

describe("condition rules", () => {
    it("applySkillCondition equal", async () => {
        let context: ContextModel = new ContextModel();
        context.skills = new Map<String, number>();
        context.skills.set("Strength", 10);
        const condition: Condition = new Condition();
        condition.type = "skillCondition";
        condition.attribute = "Strength";
        condition.equal = true;
        condition.value = 10;
        const isCondition: boolean = ConditionRules.applySkillCondition(condition, context);
        const strength: number = context.skills.get("Strength");
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(true);
    });

    it("applySkillCondition superior", async () => {
        let context: ContextModel = new ContextModel();
        context.skills = new Map<String, number>();
        context.skills.set("Strength", 10);
        const condition: Condition = new Condition();
        condition.type = "skillCondition";
        condition.attribute = "Strength";
        condition.superior = true;
        condition.value = 9;
        const isCondition: boolean = ConditionRules.applySkillCondition(condition, context);
        const strength: number = context.skills.get("Strength");
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(true);
    });

    it("applySkillCondition inferior", async () => {
        let context: ContextModel = new ContextModel();
        context.skills = new Map<String, number>();
        context.skills.set("Strength", 10);
        const condition: Condition = new Condition();
        condition.type = "skillCondition";
        condition.attribute = "Strength";
        condition.inferior = true;
        condition.value = 11;
        const isCondition: boolean = ConditionRules.applySkillCondition(condition, context);
        const strength: number = context.skills.get("Strength");
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(true);
    });

    it("applySkillCondition exists", async () => {
        let context: ContextModel = new ContextModel();
        context.skills = new Map<String, number>();
        context.skills.set("Strength", 10);
        const condition: Condition = new Condition();
        condition.type = "skillCondition";
        condition.attribute = "Strength";
        condition.exists = true;
        const isCondition: boolean = ConditionRules.applySkillCondition(condition, context);
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(true);
    });

    it("applySkillCondition not true", async () => {
        let context: ContextModel = new ContextModel();
        context.skills = new Map<String, number>();
        context.skills.set("Strength", 10);
        const condition: Condition = new Condition();
        condition.type = "skillCondition";
        condition.attribute = "Strength";
        condition.inferior = true;
        condition.value = 8;
        const isCondition: boolean = ConditionRules.applySkillCondition(condition, context);
        const strength: number = context.skills.get("Strength");
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(false);
    });

    it("applySkillCondition unknkown skill", async () => {
        let context: ContextModel = new ContextModel();
        context.skills = new Map<String, number>();
        const condition: Condition = new Condition();
        condition.type = "skillCondition";
        condition.attribute = "Luck";
        condition.inferior = true;
        const isCondition: boolean = ConditionRules.applySkillCondition(condition, context);
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(false);
    });

    it("applySkillCondition unitialized skills", async () => {
        let context: ContextModel = new ContextModel();
        const condition: Condition = new Condition();
        condition.type = "skillCondition";
        condition.attribute = "Luck";
        condition.inferior = true;
        const isCondition: boolean = ConditionRules.applySkillCondition(condition, context);
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(false);
    });

    it("applyCaracteristicCondition equal", async () => {
        let context: ContextModel = new ContextModel();
        context.caractertistics = new Map<String, number>();
        context.caractertistics.set("Strength", 10);
        const condition: Condition = new Condition();
        condition.type = "caracteristicCondition";
        condition.attribute = "Strength";
        condition.equal = true;
        condition.value = 10;
        const isCondition: boolean = ConditionRules.applyCaracteristicCondition(condition, context);
        const strength: number = context.caractertistics.get("Strength");
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(true);
    });

    it("applyCaracteristicCondition superior", async () => {
        let context: ContextModel = new ContextModel();
        context.caractertistics = new Map<String, number>();
        context.caractertistics.set("Strength", 10);
        const condition: Condition = new Condition();
        condition.type = "caracteristicCondition";
        condition.attribute = "Strength";
        condition.superior = true;
        condition.value = 9;
        const isCondition: boolean = ConditionRules.applyCaracteristicCondition(condition, context);
        const strength: number = context.caractertistics.get("Strength");
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(true);
    });

    it("applyCaracteristicCondition inferior", async () => {
        let context: ContextModel = new ContextModel();
        context.caractertistics = new Map<String, number>();
        context.caractertistics.set("Strength", 10);
        const condition: Condition = new Condition();
        condition.type = "caracteristicCondition";
        condition.attribute = "Strength";
        condition.inferior = true;
        condition.value = 11;
        const isCondition: boolean = ConditionRules.applyCaracteristicCondition(condition, context);
        const strength: number = context.caractertistics.get("Strength");
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(true);
    });

    it("applyCaracteristicCondition exists", async () => {
        let context: ContextModel = new ContextModel();
        context.caractertistics = new Map<String, number>();
        context.caractertistics.set("Strength", 10);
        const condition: Condition = new Condition();
        condition.type = "caracteristicCondition";
        condition.attribute = "Strength";
        condition.exists = true;
        const isCondition: boolean = ConditionRules.applyCaracteristicCondition(condition, context);
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(true);
    });

    it("applyCaracteristicCondition not true", async () => {
        let context: ContextModel = new ContextModel();
        context.caractertistics = new Map<String, number>();
        context.caractertistics.set("Strength", 10);
        const condition: Condition = new Condition();
        condition.type = "caracteristicCondition";
        condition.attribute = "Strength";
        condition.inferior = true;
        condition.value = 8;
        const isCondition: boolean = ConditionRules.applyCaracteristicCondition(condition, context);
        const strength: number = context.caractertistics.get("Strength");
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(false);
    });

    it("applyCaracteristicCondition unknkown caractertistic", async () => {
        let context: ContextModel = new ContextModel();
        context.caractertistics = new Map<String, number>();
        const condition: Condition = new Condition();
        condition.type = "caracteristicCondition";
        condition.attribute = "Luck";
        condition.inferior = true;
        const isCondition: boolean = ConditionRules.applyCaracteristicCondition(condition, context);
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(false);
    });

    it("applyCaracteristicCondition unitialized caractertistics", async () => {
        let context: ContextModel = new ContextModel();
        const condition: Condition = new Condition();
        condition.type = "caracteristicCondition";
        condition.attribute = "Luck";
        condition.inferior = true;
        const isCondition: boolean = ConditionRules.applyCaracteristicCondition(condition, context);
        expect(isCondition).not.toBeNull();
        expect(isCondition).toBe(false);
    });
});