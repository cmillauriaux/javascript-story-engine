import { SequenceModel } from "./models/Sequence";
import { StoryModel } from "./models/Story";
import { IPersistanceAdapter } from "./controllers/persistance-adapter";
import { SceneModel } from "./models/Scene";
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
                scene: null,
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
            return this.context.story;
        }

        getCurrentStory(): StoryModel {
            return this.context.story;
        }

        async listBasepathStories(): Promise<StoryModel[]> {
            return await this.persistance.listStories();
        }

        async listCurrentStoryScenes(): Promise<SceneModel[]> {
            return await this.persistance.listScenes(this.context.story.id);
        }

        async listCurrentSceneSequences(): Promise<SequenceModel[]> {
            return await this.persistance.listSequences(this.context.story.id, this.context.scene.id);
        }

        async loadScene(storyId: string, sceneId: string): Promise<SceneModel> {
            if (!this.context.story) {
                throw new Error("No story loaded");
            }
            this.context.scene = await this.persistance.getScene(storyId, sceneId);
            this.context.sequence = await this.persistance.getSequence(storyId, sceneId, this.context.scene.entrypoint);
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
                    if (!this.engine.isConditionValid(condition, this.context)) {
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

            const choice: Choice = this.engine.getChoice(this.context.sequence.choices, order);
            if (!this.engine.isChoiceValid(choice, this.context)) {
                throw new Error("Invalid choice");
            }

            await this.engine.applyConsequences(choice.consequences, this.context, this.persistance);

            return this.engine.getValidConsequences(choice.consequences, this.context);
        }
    }
}