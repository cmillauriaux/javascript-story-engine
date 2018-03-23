import { ContextModel } from "../models/Context";
import { Condition } from "../models/Condition";
import { Engine } from "./engine";

describe("engine", () => {
    it("isConditionValid SkillCondition", async () => {
        let context: ContextModel = new ContextModel();
        context.skills = new Map<String, number>();
        context.skills.set("Strength", 10);
        const condition: Condition = new Condition();
        condition.type = "SkillCondition";
        condition.attribute = "Strength";
        condition.exists = true;
        const engine: Engine = new Engine();
        const isValid: boolean = engine.isConditionValid(condition, context);
        expect(isValid).not.toBeNull();
        expect(isValid).toBe(true);
    });
});