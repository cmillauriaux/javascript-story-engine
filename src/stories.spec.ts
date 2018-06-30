import { SequenceModel } from "./models/Sequence";
import { StoryModel } from "./models/Story";
import { StoryEngine } from "./stories";
import { PersistanceLoki } from "./controllers/persistance-loki";

describe("stories", () => {
    let stories: StoryEngine.Stories;

    beforeAll(async (done) => {
        stories = new StoryEngine.Stories();
        const persistance = new PersistanceLoki();
        persistance.saveStory({
            id: "sample-story",
            entrypoint: "sample-sequence-01",
            title: "Sample story",
            version: 1
        });
        persistance.saveSequence("sample-story", {
            id: "sample-sequence-01",
            title: "Sequence 01",
            storyId: "sample-story",
            choices: [],
            dialogs: [],
            next: new Map()
        });
        stories.setPersistanceAdapter(persistance);
        done();
    });

    it("load story", async () => {
        const story: StoryModel = await stories.loadStory("sample-story");
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
    });

    it("get current story", async () => {
        await stories.loadStory("sample-story");
        const story: StoryModel = stories.getCurrentStory();
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
    });

    it("get current sequence", async () => {
        await stories.loadStory("sample-story");
        const sequence: SequenceModel = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("sample-sequence-01");
    });
});