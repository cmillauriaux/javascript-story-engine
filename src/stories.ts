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
    private story: StoryModel;
    private chapter: ChapterModel;
    private sequence: SequenceModel;
    private currentDialog: number;
    private context: ContextModel;

    async loadStory(storyId: string): Promise<StoryModel> {
        this.story = await persistance.getStory(storyId);
        return this.story;
    }

    getCurrentStory(): StoryModel {
        return this.story;
    }

    async loadChapter(storyId: string, chapterId: string): Promise<ChapterModel> {
        if (!this.story) {
            throw new Error("No story loaded");
        }
        this.chapter = await persistance.getChapter(storyId, chapterId);
        this.sequence = await persistance.getSequence(storyId, this.chapter.entrypoint);
        return this.chapter;
    }

    getCurrentChapter(): ChapterModel {
        return this.chapter;
    }

    getCurrentSequence(): SequenceModel {
        return this.getClientSequence(this.sequence);
    }

    getClientSequence(sequence: SequenceModel): SequenceModel {
        // clone sequence
        const clone: SequenceModel = { ...sequence };

        // return valid choices only
        clone.choices = [];
        sequence.choices.forEach(choice => {
            let choiceValid: Boolean = true;
            choice.conditions.forEach(condition => {
                if (!engine.isConditionValid(condition, this.context)) {
                    choiceValid = false;
                }
            });
            if (choiceValid) {
                clone.choices.push(choice);
            }
        });

        return clone;
    }

    makeChoice(order: number): Consequence[] {
        if (!this.sequence) {
            throw new Error("Aucune séquence en cours");
        }

        const choice: Choice = engine.getChoice(this.sequence.choices, order);
        if (!engine.isConditionValid(choice, this.context)) {
            throw new Error("Invalid choice");
        }

        return engine.getValidConsequences(choice.consequences, this.context);
    }
}