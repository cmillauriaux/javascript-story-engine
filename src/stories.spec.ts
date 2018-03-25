import { StoryEngine } from "./stories";
import { StoryModel } from "./models/Story";
import { SceneModel } from "./models/Scene";
import { SequenceModel } from "./models/Sequence";
import { PersistanceFiles } from "./controllers/persistance-files";

describe("stories", () => {
    it("load story", async () => {
        const stories: StoryEngine.Stories = new StoryEngine.Stories();
        stories.setPersistanceAdapter(new PersistanceFiles("example"));
        const story: StoryModel = await stories.loadStory("sample-story");
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
    });

    it("get current story", async () => {
        const stories: StoryEngine.Stories = new StoryEngine.Stories();
        stories.setPersistanceAdapter(new PersistanceFiles("example"));
        await stories.loadStory("sample-story");
        const story: StoryModel = stories.getCurrentStory();
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
    });

    it("load scene", async () => {
        const stories: StoryEngine.Stories = new StoryEngine.Stories();
        stories.setPersistanceAdapter(new PersistanceFiles("example"));
        await stories.loadStory("sample-story");
        const scene: SceneModel = await stories.loadScene("sample-story", "sample-scene-01");
        expect(scene).not.toBeNull();
        expect(scene.id).toBe("sample-scene-01");
    });

    it("get current scene", async () => {
        const stories: StoryEngine.Stories = new StoryEngine.Stories();
        stories.setPersistanceAdapter(new PersistanceFiles("example"));
        await stories.loadStory("sample-story");
        await stories.loadScene("sample-story", "sample-scene-01");
        const scene: SceneModel = await stories.getCurrentScene();
        expect(scene).not.toBeNull();
        expect(scene.id).toBe("sample-scene-01");
    });

    it("get current sequence", async () => {
        const stories: StoryEngine.Stories = new StoryEngine.Stories();
        stories.setPersistanceAdapter(new PersistanceFiles("example"));
        await stories.loadStory("sample-story");
        await stories.loadScene("sample-story", "sample-scene-01");
        const sequence: SequenceModel = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("sample-sequence-01");
    });
});