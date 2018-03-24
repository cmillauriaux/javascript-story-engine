import { Stories } from "./stories";
import { StoryModel } from "./models/Story";
import { SceneModel } from "./models/Scene";
import { SequenceModel } from "./models/Sequence";

describe("stories", () => {
    it("load story", async () => {
        const stories: Stories = new Stories();
        const story: StoryModel = await stories.loadStory("sample-story");
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
    });

    it("get current story", async () => {
        const stories: Stories = new Stories();
        await stories.loadStory("sample-story");
        const story: StoryModel = stories.getCurrentStory();
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
    });

    it("load scene", async () => {
        const stories: Stories = new Stories();
        await stories.loadStory("sample-story");
        const scene: SceneModel = await stories.loadChapter("sample-story", "sample-scene-01");
        expect(scene).not.toBeNull();
        expect(scene.id).toBe("sample-scene-01");
    });

    it("get current scene", async () => {
        const stories: Stories = new Stories();
        await stories.loadStory("sample-story");
        await stories.loadChapter("sample-story", "sample-scene-01");
        const scene: SceneModel = await stories.getCurrentChapter();
        expect(scene).not.toBeNull();
        expect(scene.id).toBe("sample-scene-01");
    });

    it("get current sequence", async () => {
        const stories: Stories = new Stories();
        await stories.loadStory("sample-story");
        await stories.loadChapter("sample-story", "sample-scene-01");
        const sequence: SequenceModel = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("sample-sequence-01");
    });
});