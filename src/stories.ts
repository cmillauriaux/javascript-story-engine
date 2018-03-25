import { SequenceModel } from "./models/Sequence";
import { StoryModel } from "./models/Story";
import { Persistance } from "./controllers/persistance";
import { SceneModel } from "./models/Scene";
import { Consequence } from "./models/Consequence";
import { Engine } from "./controllers/engine";
import { Choice } from "./models/Choice";
import { Context } from "vm";
import { ContextModel } from "./models/Context";

let persistance: Persistance = new Persistance("example");
const engine: Engine = new Engine();

export namespace StoryEngine {
    export class Stories {
        public context: ContextModel;

        initContext(): void {
            this.context = {
                id: "new-context",
                relations: [],
                skills: new Map<String, number>(),
                inventory: new Map<String, number>(),
                story: null,
                scene: null,
                sequence: null,
                currentDialog: 0,
            };
        }

        setBasePath(basePath: string): void {
            persistance = new Persistance(basePath);
        }

        async loadStory(storyId: string): Promise<StoryModel> {
            this.initContext();
            this.context.story = await persistance.getStory(storyId);
            return this.context.story;
        }

        getCurrentStory(): StoryModel {
            return this.context.story;
        }

        async loadScene(storyId: string, sceneId: string): Promise<SceneModel> {
            if (!this.context.story) {
                throw new Error("No story loaded");
            }
            this.context.scene = await persistance.getScene(storyId, sceneId);
            this.context.sequence = await persistance.getSequence(storyId, sceneId, this.context.scene.entrypoint);
            return this.context.scene;
        }

        getCurrentScene(): SceneModel {
            return this.context.scene;
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
            }

            return clone;
        }

        async makeChoice(order: number): Promise<Consequence[]> {
            if (!this.context.sequence) {
                throw new Error("Aucune séquence en cours");
            }

            const choice: Choice = engine.getChoice(this.context.sequence.choices, order);
            if (!engine.isChoiceValid(choice, this.context)) {
                throw new Error("Invalid choice");
            }

            await engine.applyConsequences(choice.consequences, this.context);

            return engine.getValidConsequences(choice.consequences, this.context);
        }
    }
}