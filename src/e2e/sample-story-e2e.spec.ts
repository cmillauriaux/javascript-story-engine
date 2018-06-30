import { StoryEngine } from "../stories";
import { StoryModel } from "../models/Story";
import { SequenceModel } from "../models/Sequence";
import { Choice } from "../models/Choice";
import { PersistanceLoki } from "../controllers/persistance-loki";
import { LoaderYML } from "../controllers/loader-yml";

describe("sample-story End-To-End", () => {
    let stories: StoryEngine.Stories;

    it("load story", async () => {
        const loader = new LoaderYML();
        const persistance = await loader.loadFiles(new PersistanceLoki(), "./example/sample-story");
        stories = new StoryEngine.Stories();
        stories.setPersistanceAdapter(persistance);
        const story: StoryModel = await stories.loadStory("sample-story");
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
    });

    it("read first sequence", async () => {
        const sequence: SequenceModel = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
    });

    it("get choices", async () => {
        const sequence: SequenceModel = stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.choices).not.toBeNull();
        expect(sequence.choices.length).toBe(2);
    });

    it("make first choice", async () => {
        await stories.makeChoice(1);
        const sequence: SequenceModel = stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("SEQUENCE-CASTLE-MAIN-GATE");
    });
});