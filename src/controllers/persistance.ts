import { StoryModel } from "../models/Story";
import { SceneModel } from "../models/Scene";
import { SequenceModel } from "../models/Sequence";
import { CharacterModel } from "../models/Character";
import * as fs from "fs";
import { ContextModel } from "../models/Context";

export class Persistance {
    private fs = require("fs");
    private rootPath: String;

    constructor(rootPath: String) {
        this.rootPath = rootPath;
    }

    listStories(): StoryModel[] {
        return [];
    }

    private async readFile(path: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            // tslint:disable-next-line:typedef
            this.fs.readFile(this.rootPath + "/" + path, function (err: any, data: any) {
                if (err) {
                    return reject(err);
                }
                resolve(data.toString());
            });
        });
    }

    listChapters(storyId: string): SceneModel[] {
        return [];
    }

    async listCharacters(storyId: string): Promise<CharacterModel[]> {
        const characters : string  = await this.readFile("./" + storyId + "/" + "characters" + ".json");
        return JSON.parse(characters);
    }

    async getStory(storyId: string): Promise<StoryModel> {
        const story : string  = await this.readFile("./" + storyId + "/" + "story.json");
        return JSON.parse(story);
    }

    async getChapter(storyId: string, chapterId: string): Promise<SceneModel> {
        const story : string  = await this.readFile("./" + storyId + "/scene-" + chapterId + ".json");
        return JSON.parse(story);
    }

    async getCharacter(storyId: string, characterId: string): Promise<CharacterModel> {
        const story : string  = await this.readFile("./" + storyId + "/character-" + characterId + ".json");
        return JSON.parse(story);
    }

    async getSequence(storyId: string, sequenceId: string): Promise<SequenceModel> {
        const story : string = await this.readFile("./" + storyId + "/sequence-" + sequenceId + ".json");
        const sequence: SequenceModel = JSON.parse(story);
        return sequence;
    }

    async getContext(storyId: string, contextId: string): Promise<ContextModel> {
        const story : string = await this.readFile("./" + storyId + "/context-" + contextId + ".json");
        return JSON.parse(story);
    }
}
