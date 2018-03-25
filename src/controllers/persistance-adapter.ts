import { StoryModel } from "../models/Story";
import { SceneModel } from "../models/Scene";
import { SequenceModel } from "../models/Sequence";
import { CharacterModel } from "../models/Character";
import { ContextModel } from "../models/Context";

export interface IPersistanceAdapter {
    listStories(): Promise<StoryModel[]>;

    listScenes(storyId: string): Promise<SceneModel[]>;

    listSequences(storyId: string, sceneId: string): Promise<SequenceModel[]>;

    listCharacters(storyId: string): Promise<CharacterModel[]>;

    getStory(storyId: string): Promise<StoryModel>;

    getScene(storyId: string, sceneId: string): Promise<SceneModel>;

    getCharacter(storyId: string, characterId: string): Promise<CharacterModel>;

    getSequence(storyId: string, sceneId: string, sequenceId: string): Promise<SequenceModel>;

    getContext(storyId: string, contextId: string): Promise<ContextModel>;
}