import { StoryEngine } from "../stories";
import { StoryModel } from "../models/Story";
import { SceneModel } from "../models/Scene";
import { SequenceModel } from "../models/Sequence";
import { Choice } from "../models/Choice";

describe("sample-story End-To-End", () => {
    let stories: StoryEngine.Stories;

    it("load story", async () => {
        stories = new StoryEngine.Stories();
        const story: StoryModel = await stories.loadStory("sample-story");
        const scene: SceneModel = await stories.loadScene("sample-story", "sample-scene-01");
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
        expect(scene).not.toBeNull();
        expect(scene.id).toBe("sample-scene-01");
    });

    it("read first sequence", async () => {
        const sequence: SequenceModel = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
    });

    it("get choices", async () => {
        const sequence: SequenceModel = stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.choices).not.toBeNull();
        expect(sequence.choices.length).toBe(3);
    });

    it("make first choice", async () => {
        await stories.makeChoice(1);
        const strength: number = stories.context.skills.get("Strength");
        expect(strength).not.toBeNull();
        expect(strength).toBe(10);
        const sequence: SequenceModel = stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("sample-sequence-02");
    });
});