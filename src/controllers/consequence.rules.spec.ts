import { ContextModel } from "../models/Context";
import { Consequence } from "../models/Consequence";
import { ConsequenceRules } from "./consequence.rules";
import { SequenceModel } from "../models/Sequence";
import { StoryModel } from "../models/Story";

describe("consequence rules", () => {
    it("applySkillConsequence bonus", async () => {
        let context: ContextModel = new ContextModel();
        const consequence: Consequence = new Consequence();
        consequence.bonus = true;
        consequence.name = "Strength";
        consequence.type = "SkillConsequence";
        consequence.value = 10;
        context = ConsequenceRules.applySkillConsequence(consequence, context);
        const strength: number = context.skills.get("Strength");
        expect(strength).not.toBeNull();
        expect(strength).toBe(10);
    });

    it("applySkillConsequence bonus with initial value", async () => {
        let context: ContextModel = new ContextModel();
        context.skills = new Map<String, number>();
        context.skills.set("Strength", 10);
        const consequence: Consequence = new Consequence();
        consequence.bonus = true;
        consequence.name = "Strength";
        consequence.type = "SkillConsequence";
        consequence.value = 10;
        context = ConsequenceRules.applySkillConsequence(consequence, context);
        const strength: number = context.skills.get("Strength");
        expect(strength).not.toBeNull();
        expect(strength).toBe(20);
    });

    it("applySkillConsequence malus", async () => {
        let context: ContextModel = new ContextModel();
        const consequence: Consequence = new Consequence();
        consequence.bonus = false;
        consequence.name = "Strength";
        consequence.type = "SkillConsequence";
        consequence.value = 10;
        context = ConsequenceRules.applySkillConsequence(consequence, context);
        const strength: number = context.skills.get("Strength");
        expect(strength).not.toBeNull();
        expect(strength).toBe(-10);
    });

    it("applyCaracteristicConsequence bonus", async () => {
        let context: ContextModel = new ContextModel();
        const consequence: Consequence = new Consequence();
        consequence.bonus = true;
        consequence.name = "Strength";
        consequence.type = "SkillConsequence";
        consequence.value = 10;
        context = ConsequenceRules.applyCaracteristicConsequence(consequence, context);
        const strength: number = context.caractertistics.get("Strength");
        expect(strength).not.toBeNull();
        expect(strength).toBe(10);
    });

    it("applyCaracteristicConsequence bonus with initial value", async () => {
        let context: ContextModel = new ContextModel();
        context.caractertistics = new Map<String, number>();
        context.caractertistics.set("Strength", 10);
        const consequence: Consequence = new Consequence();
        consequence.bonus = true;
        consequence.name = "Strength";
        consequence.type = "SkillConsequence";
        consequence.value = 10;
        context = ConsequenceRules.applyCaracteristicConsequence(consequence, context);
        const strength: number = context.caractertistics.get("Strength");
        expect(strength).not.toBeNull();
        expect(strength).toBe(20);
    });

    it("applyCaracteristicConsequence malus", async () => {
        let context: ContextModel = new ContextModel();
        const consequence: Consequence = new Consequence();
        consequence.bonus = false;
        consequence.name = "Strength";
        consequence.type = "SkillConsequence";
        consequence.value = 10;
        context = ConsequenceRules.applyCaracteristicConsequence(consequence, context);
        const strength: number = context.caractertistics.get("Strength");
        expect(strength).not.toBeNull();
        expect(strength).toBe(-10);
    });

    it("applySequenceTransitionConsequence", async () => {
        let context: ContextModel = new ContextModel();
        context.story = new StoryModel();
        context.story.id = "sample-story";
        const consequence: Consequence = new Consequence();
        consequence.name = "sample-sequence-02";
        consequence.type = "SequenceTransitionConsequence";
        context = await ConsequenceRules.applySequenceTransitionConsequence(consequence, context);
        const sequence: SequenceModel = context.sequence;
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("sample-sequence-02");
    });
});