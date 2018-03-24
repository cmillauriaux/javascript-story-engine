import { Persistance } from "./persistance";
import { StoryModel } from "../models/Story";
import { SceneModel } from "../models/Scene";
import { SequenceModel } from "../models/Sequence";
import { CharacterModel } from "../models/Character";
import { ContextModel } from "../models/Context";

describe("persistance", () => {
    it("load story", async () => {
        const persistance: Persistance = new Persistance("example");
        const story: StoryModel = await persistance.getStory("sample-story");
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
    });

    it("load scene", async () => {
        const persistance: Persistance = new Persistance("example");
        const scene: SceneModel = await persistance.getChapter("sample-story", "sample-scene-01");
        expect(scene).not.toBeNull();
        expect(scene.id).toBe("sample-scene-01");
    });

    it("load sequence", async () => {
        const persistance: Persistance = new Persistance("example");
        const sequence: SequenceModel = await persistance.getSequence("sample-story", "sample-sequence-01");
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("sample-sequence-01");
    });

    it("load context", async () => {
        const persistance: Persistance = new Persistance("example");
        const context: ContextModel = await persistance.getContext("sample-story", "sample-context-01");
        expect(context).not.toBeNull();
        expect(context.id).toBe("sample-context-01");
    });
});