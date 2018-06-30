import { StoryModel } from "../models/Story";
import { SequenceModel } from "../models/Sequence";
import { CharacterModel } from "../models/Character";
import { ContextModel } from "../models/Context";
import { IPersistanceAdapter } from "./persistance-adapter";
import * as Loki from "lokijs";

export class PersistanceLoki implements IPersistanceAdapter {
    private loki: Loki;
    private characters: Loki.Collection;
    private stories: Loki.Collection;
    private sequences: Loki.Collection;
    private contexts: Loki.Collection;
    private rootPath: string;

    constructor(json?: string) {
        this.loki = new Loki("story.db");
        if (json) {
            this.loki.loadJSON(json);
        }
        this.stories = this.loki.getCollection("stories");
        if (this.stories == null) {
            this.stories = this.loki.addCollection("stories");
        }
        this.characters = this.loki.getCollection("characters");
        if (this.characters == null) {
            this.characters = this.loki.addCollection("characters");
        }
        this.sequences = this.loki.getCollection("sequences");
        if (this.sequences == null) {
            this.sequences = this.loki.addCollection("sequences");
        }
        this.contexts = this.loki.getCollection("contexts");
        if (this.contexts == null) {
            this.contexts = this.loki.addCollection("contexts");
        }
    }

    async listStories(): Promise<StoryModel[]> {
        console.log("listStories");
        return this.stories.find();
    }

    async listSequences(storyId: string): Promise<SequenceModel[]> {
        return this.sequences.find({ storyId: storyId });
    }

    async listCharacters(storyId: string): Promise<CharacterModel[]> {
        return this.characters.find({ storyId: storyId });
    }

    async getStory(storyId: string): Promise<StoryModel> {
        return this.stories.findOne({ id: storyId });
    }

    async getCharacter(storyId: string, characterId: string): Promise<CharacterModel> {
        return this.characters.findOne({ id: characterId, storyId: storyId });
    }

    async getSequence(storyId: string, sequenceId: string): Promise<SequenceModel> {
        return this.sequences.findOne({ storyId: storyId, id: sequenceId });
    }

    async getContext(storyId: string, contextId: string): Promise<ContextModel> {
        return this.contexts.findOne();
    }

    async exportStory(storyId: string): Promise<string> {
        return this.loki.serialize();
    }

    async saveStory(story: StoryModel) {
        if (await this.getStory(story.id)) {
            this.stories.update(story);
        } else {
            this.stories.insert(story);
        }
    }

    async saveSequence(storyId: string, sequence: SequenceModel) {
        if (await this.getSequence(storyId, sequence.id)) {
            this.sequences.update(sequence);
        } else {
            this.sequences.insert(sequence);
        }
    }

    async saveCharacter(storyId: string, character: CharacterModel) {
        if (await this.getCharacter(storyId, character.id)) {
            this.characters.update(character);
        } else {
            this.characters.insert(character);
        }
    }

    async saveContext(storyId: string, context: ContextModel) {
        if (await this.getContext(storyId, context.id)) {
            this.contexts.update(context);
        } else {
            this.contexts.insert(context);
        }
    }
}
