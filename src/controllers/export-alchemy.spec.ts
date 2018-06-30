import { LoaderYML } from "./loader-yml";
import { PersistanceLoki } from "./persistance-loki";
import { StoryEngine } from "../stories";
import { StoryModel } from "../models/Story";
import { ExportAlchemy } from "./export-alchemy";

describe("consequence rules", () => {
    it("export to alchemy", async () => {
        const loader = new LoaderYML();
        const persistance = await loader.loadFiles(new PersistanceLoki(), "./example/sample-story");
        let stories = new StoryEngine.Stories();
        stories.setPersistanceAdapter(persistance);
        const story: StoryModel = await stories.loadStory("sample-story");
        expect(story).not.toBeNull();
        expect(story.id).toBe("sample-story");
        const exportAlchemy = new ExportAlchemy();
        const result = await exportAlchemy.export(persistance, story.id);
        expect(result).not.toBeNull();
        console.log(result);
    });
});