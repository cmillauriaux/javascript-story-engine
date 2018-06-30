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

    it("Play", async () => {
        // Entry
        let sequence: SequenceModel = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.choices).not.toBeNull();
        expect(sequence.choices.length).toBe(2);

        // Go to the small door
        await stories.makeChoice(2);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-SMALL-DOOR-NOTHING");

        // Go back the entry
        await stories.makeChoice(1);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-ENTRY");

        // Go to main gate
        await stories.makeChoice(1);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-MAIN-GATE");

        // Return to entry
        await stories.makeChoice(2);
        sequence = stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-ENTRY");

        // Go to the courtyard, throw the main gate
        await stories.makeChoice(1);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-MAIN-GATE");
        await stories.makeChoice(1);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-COURTYARD");

        // Go to the door
        await stories.makeChoice(1);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-SHELTER-DOOR");

        // Speek to the guardian and go back
        expect(sequence.choices).not.toBeNull();
        expect(sequence.choices.length).toBe(2);
        await stories.makeChoice(1);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-COURTYARD");

        // Speek to the guardian again
        await stories.makeChoice(1);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-SHELTER-DOOR");
        expect(sequence.choices).not.toBeNull();
        expect(sequence.choices.length).toBe(2);
        await stories.makeChoice(2);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-SHELTER-DOOR-GO-AWAY");

        // Speek to the guardian again
        await stories.makeChoice(1);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-COURTYARD");
        await stories.makeChoice(1);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-SHELTER-DOOR");
        expect(sequence.choices).not.toBeNull();
        expect(sequence.choices.length).toBe(1);

        // Go back to the entry
        await stories.makeChoice(1);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-COURTYARD");
        await stories.makeChoice(2);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-MAIN-GATE");
        await stories.makeChoice(2);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-ENTRY");

        // Go to the small door
        await stories.makeChoice(2);
        sequence = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("CASTLE-SMALL-DOOR-CAT");
    });
});