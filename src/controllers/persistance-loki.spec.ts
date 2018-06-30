import { PersistanceLoki } from "./persistance-loki";
import { StoryModel } from "../models/Story";
import { SequenceModel } from "../models/Sequence";
import { CharacterModel } from "../models/Character";
import { ContextModel } from "../models/Context";

describe("persistance Lokijs", () => {
    const fs: any = require("fs");
    let JSONStory: string = "{}";

    function readFile(path: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            // tslint:disable-next-line:typedef
            fs.readFile(path, function (err: any, data: any) {
                if (err) {
                    return reject(err);
                }
                resolve(data.toString());
            });
        });
    }

    beforeAll(async (done) => {
        JSONStory = await readFile("example/sample-db.json");
        done();
    });

    it("load story", async () => {
        const persistance: PersistanceLoki = new PersistanceLoki(JSONStory);
        const story: StoryModel = await persistance.getStory("sample-story");
        // persistance.generateTest();
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
    });

    it("load sequence", async () => {
        const persistance: PersistanceLoki = new PersistanceLoki(JSONStory);
        const sequence: SequenceModel = await persistance.getSequence("sample-story", "sample-sequence-01");
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("sample-sequence-01");
    });

    it("load context", async () => {
        const persistance: PersistanceLoki = new PersistanceLoki(JSONStory);
        const context: ContextModel = await persistance.getContext("sample-story", "sample-context-01");
        expect(context).not.toBeNull();
        expect(context.id).toBe("sample-context-01");
    });

    it("load stories", async () => {
        const persistance: PersistanceLoki = new PersistanceLoki(JSONStory);
        const stories: StoryModel[] = await persistance.listStories();
        expect(stories).not.toBeNull();
        expect(stories.length).toBe(1);
    });


    it("load sequences", async () => {
        const persistance: PersistanceLoki = new PersistanceLoki(JSONStory);
        const sequences: SequenceModel[] = await persistance.listSequences("sample-story");
        expect(sequences).not.toBeNull();
        expect(sequences.length).toBe(2);
    });
});