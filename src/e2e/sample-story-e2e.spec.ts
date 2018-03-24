import { Stories } from "../stories";
import { StoryModel } from "../models/Story";
import { SceneModel } from "../models/Scene";
import { SequenceModel } from "../models/Sequence";

describe("sample-story End-To-End", () => {
    let stories: Stories;

    it("load story", async () => {
        stories = new Stories();
        const story: StoryModel = await stories.loadStory("sample-story");
        const scene: SceneModel = await stories.loadChapter("sample-story", "sample-scene-01");
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
        expect(scene).not.toBeNull();
        expect(scene.id).toBe("sample-scene-01");
    });

    it("read first sequence", async () => {
        const sequence: SequenceModel = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
    });

    it("make first choice", async () => {
        stories.makeChoice(1);
        const strength: number = stories.context.skills.get("Strength");
        expect(strength).not.toBeNull();
        expect(strength).toBe(10);
    });
});