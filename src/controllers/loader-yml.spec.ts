import { LoaderYML } from "./loader-yml";
import { PersistanceLoki } from "./persistance-loki";

describe("loader yml", () => {
    it("load story", async () => {
        const loader = new LoaderYML();
        const persistance = new PersistanceLoki();
        loader.load(persistance, `
            story:
                id: STORY-001
                title: An example story
                entrypoint: SCENE-001
        `)
        const story = await persistance.getStory("STORY-001");
        expect(story).not.toBeNull();
        expect(story.id).toBe("STORY-001");
    });

    it("load story from files", async () => {
        const loader = new LoaderYML();
        const persistance = new PersistanceLoki();
        loader.loadFiles(persistance, "example/sample-story")
        const story = await persistance.getStory("STORY-001");
        expect(story).not.toBeNull();
        expect(story.id).toBe("STORY-001");
    });
});