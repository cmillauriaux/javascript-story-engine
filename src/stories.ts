import { SequenceModel } from "./models/Sequence";
import { StoryModel } from "./models/Story";
import { Persistance } from "./controllers/persistance";
import { ChapterModel } from "./models/Chapter";
import { Consequence } from "./models/Consequence";
import { Engine } from "./controllers/engine";
import { Choice } from "./models/Choice";
import { Context } from "vm";
import { ContextModel } from "./models/Context";

const persistance: Persistance = new Persistance("example");
const engine: Engine = new Engine();

export class Stories {
    private context: ContextModel;

    initContext() {
        this.context = {
            id: "new-context",
            relations: [],
            skills: new Map<String, number>(),
            caractertistics: new Map<String, number>(),
            story: null,
            chapter: null,
            sequence: null,
            currentDialog: 0,
        };
    }

    async loadStory(storyId: string): Promise<StoryModel> {
        this.initContext();
        this.context.story = await persistance.getStory(storyId);
        return this.context.story;
    }

    getCurrentStory(): StoryModel {
        return this.context.story;
    }

    async loadChapter(storyId: string, chapterId: string): Promise<ChapterModel> {
        if (!this.context.story) {
            throw new Error("No story loaded");
        }
        this.context.chapter = await persistance.getChapter(storyId, chapterId);
        this.context.sequence = await persistance.getSequence(storyId, this.context.chapter.entrypoint);
        return this.context.chapter;
    }

    getCurrentChapter(): ChapterModel {
        return this.context.chapter;
    }

    getCurrentSequence(): SequenceModel {
        return this.getClientSequence(this.context.sequence);
    }

    getClientSequence(sequence: SequenceModel): SequenceModel {
        // clone sequence
        const clone: SequenceModel = { ...sequence };

        // return valid choices only
        clone.choices = [];
        for (let choice of sequence.choices) {
            let choiceValid: Boolean = true;
            for (let condition of choice.conditions) {
                if (!engine.isConditionValid(condition, this.context)) {
                    choiceValid = false;
                }
            }
            if (choiceValid) {
                clone.choices.push(choice);
            }
        };

        return clone;
    }

    makeChoice(order: number): Consequence[] {
        if (!this.context.sequence) {
            throw new Error("Aucune séquence en cours");
        }

        const choice: Choice = engine.getChoice(this.context.sequence.choices, order);
        if (!engine.isConditionValid(choice, this.context)) {
            throw new Error("Invalid choice");
        }

        engine.applyConsequences(choice.consequences, this.context);

        return engine.getValidConsequences(choice.consequences, this.context);
    }
}