import { Stories } from "./stories";
import { StoryModel } from "./models/Story";
import { ChapterModel } from "./models/Chapter";
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

    it("load chapter", async () => {
        const stories: Stories = new Stories();
        await stories.loadStory("sample-story");
        const chapter: ChapterModel = await stories.loadChapter("sample-story", "sample-chapter-01");
        expect(chapter).not.toBeNull();
        expect(chapter.id).toBe("sample-chapter-01");
    });

    it("get current chapter", async () => {
        const stories: Stories = new Stories();
        await stories.loadStory("sample-story");
        await stories.loadChapter("sample-story", "sample-chapter-01");
        const chapter: ChapterModel = await stories.getCurrentChapter();
        expect(chapter).not.toBeNull();
        expect(chapter.id).toBe("sample-chapter-01");
    });

    it("get current sequence", async () => {
        const stories: Stories = new Stories();
        await stories.loadStory("sample-story");
        await stories.loadChapter("sample-story", "sample-chapter-01");
        const sequence: SequenceModel = await stories.getCurrentSequence();
        expect(sequence).not.toBeNull();
        expect(sequence.id).toBe("sample-sequence-01");
    });
});