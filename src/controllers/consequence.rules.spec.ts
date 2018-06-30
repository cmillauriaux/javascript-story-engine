import { ContextModel } from "../models/Context";
import { Consequence } from "../models/Consequence";
import { ConsequenceRules } from "./consequence.rules";
import { SequenceModel } from "../models/Sequence";
import { StoryModel } from "../models/Story";
import { IPersistanceAdapter } from "./persistance-adapter";
import { PersistanceLoki } from "./persistance-loki";
import { LoaderYML } from "./loader-yml";
import { StoryEngine } from "../stories";

describe("consequence rules", () => {
    it("applySkillConsequence bonus", async () => {
        let context: ContextModel = new ContextModel();
        const consequence: Consequence = new Consequence();
        consequence.bonus = true;
        consequence.name = "Strength";
        consequence.type = "skill";
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
        consequence.type = "skill";
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
        consequence.type = "skill";
        consequence.value = 10;
        context = ConsequenceRules.applySkillConsequence(consequence, context);
        const strength: number = context.skills.get("Strength");
        expect(strength).not.toBeNull();
        expect(strength).toBe(-10);
    });

    it("applyInventoryConsequence bonus", async () => {
        let context: ContextModel = new ContextModel();
        const consequence: Consequence = new Consequence();
        consequence.bonus = true;
        consequence.name = "Strength";
        consequence.type = "skill";
        consequence.value = 10;
        context = ConsequenceRules.applyInventoryConsequence(consequence, context);
        const strength: number = context.inventory.get("Strength");
        expect(strength).not.toBeNull();
        expect(strength).toBe(10);
    });

    it("applyInventoryConsequence bonus with initial value", async () => {
        let context: ContextModel = new ContextModel();
        context.inventory = new Map<String, number>();
        context.inventory.set("Strength", 10);
        const consequence: Consequence = new Consequence();
        consequence.bonus = true;
        consequence.name = "Strength";
        consequence.type = "skill";
        consequence.value = 10;
        context = ConsequenceRules.applyInventoryConsequence(consequence, context);
        const strength: number = context.inventory.get("Strength");
        expect(strength).not.toBeNull();
        expect(strength).toBe(20);
    });

    it("applyInventoryConsequence malus", async () => {
        let context: ContextModel = new ContextModel();
        const consequence: Consequence = new Consequence();
        consequence.bonus = false;
        consequence.name = "Strength";
        consequence.type = "skill";
        consequence.value = 10;
        context = ConsequenceRules.applyInventoryConsequence(consequence, context);
        const strength: number = context.inventory.get("Strength");
        expect(strength).not.toBeNull();
        expect(strength).toBe(-10);
    });

    it("applySequenceTransitionConsequence", async () => {
        const stories = new StoryEngine.Stories();
        const persistance = new PersistanceLoki();
        await persistance.saveStory({
            id: "sample-story",
            entrypoint: "sample-sequence-01",
            title: "Sample story",
            version: 1
        });
        await persistance.saveSequence("sample-story", {
            id: "sample-sequence-02",
            title: "Sequence 02",
            storyId: "sample-story",
            choices: [],
            dialogs: [],
            next: new Map()
        });
        stories.setPersistanceAdapter(persistance);
        let context: ContextModel = new ContextModel();
        context.story = new StoryModel();
        context.story.id = "sample-story";
        const consequence: Consequence = new Consequence();
        consequence.name = "sample-sequence-02";
        consequence.type = "sequence";
        context = await ConsequenceRules.applySequenceTransitionConsequence(consequence, context, persistance);
        const sequence: SequenceModel = context.sequence;
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("sample-sequence-02");
    });
});