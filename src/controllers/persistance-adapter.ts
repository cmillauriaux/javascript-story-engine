import { StoryModel } from "../models/Story";
import { SequenceModel } from "../models/Sequence";
import { CharacterModel } from "../models/Character";
import { ContextModel } from "../models/Context";

export interface IPersistanceAdapter {
    listStories(): Promise<StoryModel[]>;

    listSequences(storyId: string): Promise<SequenceModel[]>;

    listCharacters(storyId: string): Promise<CharacterModel[]>;

    getStory(storyId: string): Promise<StoryModel>;

    getCharacter(storyId: string, characterId: string): Promise<CharacterModel>;

    getSequence(storyId: string, sequenceId: string): Promise<SequenceModel>;

    getContext(storyId: string, contextId: string): Promise<ContextModel>;

    exportStory(storyId: string): Promise<string>;

    saveStory(story: StoryModel);

    saveSequence(storyId: string, sequence: SequenceModel);

    saveCharacter(storyId: string, character: CharacterModel);

    saveContext(storyId: string, context: ContextModel);
}