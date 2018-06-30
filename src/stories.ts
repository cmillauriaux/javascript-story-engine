import { SequenceModel } from "./models/Sequence";
import { StoryModel } from "./models/Story";
import { IPersistanceAdapter } from "./controllers/persistance-adapter";
import { Consequence } from "./models/Consequence";
import { Engine } from "./controllers/engine";
import { Choice } from "./models/Choice";
import { Context } from "vm";
import { ContextModel } from "./models/Context";

export namespace StoryEngine {
    export class Stories {
        public context: ContextModel;
        private persistance: IPersistanceAdapter;
        private engine: Engine = new Engine();

        initContext(): void {
            this.context = {
                id: "new-context",
                relations: [],
                skills: new Map<String, number>(),
                inventory: new Map<String, number>(),
                story: null,
                sequence: null,
                currentDialog: 0,
            };
        }

        setPersistanceAdapter(adapter: IPersistanceAdapter): void {
            this.persistance = adapter;
        }

        async loadStory(storyId: string): Promise<StoryModel> {
            this.initContext();
            this.context.story = await this.persistance.getStory(storyId);

            this.context.sequence = await this.persistance.getSequence(storyId, this.context.story.entrypoint);

            return this.context.story;
        }

        getCurrentStory(): StoryModel {
            return this.context.story;
        }

        async listBasepathStories(): Promise<StoryModel[]> {
            return await this.persistance.listStories();
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
                if (choice.conditions) {
                    for (let condition of choice.conditions) {
                        if (!this.engine.isConditionValid(condition, this.context)) {
                            choiceValid = false;
                        }
                    }
                }
                if (choiceValid) {
                    clone.choices.push(choice);
                }
            }

            return clone;
        }

        async makeChoice(order: number): Promise<Consequence[]> {
            if (!this.context.sequence) {
                throw new Error("Aucune séquence en cours");
            }

            const choice: Choice = this.engine.getChoice(this.context.sequence.choices, order);
            if (!this.engine.isChoiceValid(choice, this.context)) {
                throw new Error("Invalid choice");
            }

            await this.engine.applyConsequences(choice.consequences, this.context, this.persistance);

            return this.engine.getValidConsequences(choice.consequences, this.context);
        }
    }
}