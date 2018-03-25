import { PersistanceFiles } from "./persistance-files";
import { StoryModel } from "../models/Story";
import { SceneModel } from "../models/Scene";
import { SequenceModel } from "../models/Sequence";
import { CharacterModel } from "../models/Character";
import { ContextModel } from "../models/Context";

describe("persistance", () => {
    it("load story", async () => {
        const persistance: PersistanceFiles = new PersistanceFiles("example");
        const story: StoryModel = await persistance.getStory("sample-story");
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
    });

    it("load scene", async () => {
        const persistance: PersistanceFiles = new PersistanceFiles("example");
        const scene: SceneModel = await persistance.getScene("sample-story", "sample-scene-01");
        expect(scene).not.toBeNull();
        expect(scene.id).toBe("sample-scene-01");
    });

    it("load sequence", async () => {
        const persistance: PersistanceFiles = new PersistanceFiles("example");
        const sequence: SequenceModel = await persistance.getSequence("sample-story", "sample-scene-01", "sample-sequence-01");
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("sample-sequence-01");
    });

    it("load context", async () => {
        const persistance: PersistanceFiles = new PersistanceFiles("example");
        const context: ContextModel = await persistance.getContext("sample-story", "sample-context-01");
        expect(context).not.toBeNull();
        expect(context.id).toBe("sample-context-01");
    });

    it("load stories", async () => {
        const persistance: PersistanceFiles = new PersistanceFiles("example");
        const stories: StoryModel[] = await persistance.listStories();
        expect(stories).not.toBeNull();
        expect(stories.length).toBe(1);
    });

    it("load scenes", async () => {
        const persistance: PersistanceFiles = new PersistanceFiles("example");
        const scenes: SceneModel[] = await persistance.listScenes("sample-story");
        expect(scenes).not.toBeNull();
        expect(scenes.length).toBe(1);
    });

    it("load sequences", async () => {
        const persistance: PersistanceFiles = new PersistanceFiles("example");
        const sequences: SequenceModel[] = await persistance.listSequences("sample-story", "sample-scene-01");
        expect(sequences).not.toBeNull();
        expect(sequences.length).toBe(2);
    });
});