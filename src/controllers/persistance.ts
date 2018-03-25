import { StoryModel } from "../models/Story";
import { SceneModel } from "../models/Scene";
import { SequenceModel } from "../models/Sequence";
import { CharacterModel } from "../models/Character";
import * as fs from "fs";
import * as path from "path";
import { ContextModel } from "../models/Context";

export class Persistance {
    private fs = require("fs");
    private rootPath: string;

    constructor(rootPath: string) {
        this.rootPath = rootPath;
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

    async listScenes(storyId: string): Promise<SceneModel[]> {
        const scenes: SceneModel[] = new Array<SceneModel>();
        // tslint:disable-next-line:max-line-length
        const dirs: string[] = fs.readdirSync(this.rootPath + "/" + storyId).filter(f => fs.statSync(path.join(this.rootPath + "/" + storyId, f)).isDirectory());
        for (let dir of dirs) {
            try {
                scenes.push(await this.getScene(storyId, dir));
            } catch (error) {
                console.log(error);
            }
        }
        return scenes;
    }

    async listSequences(storyId: string, sceneId: string): Promise<SequenceModel[]> {
        const sqeuences: SequenceModel[] = new Array<SequenceModel>();
        const files: string[] = fs.readdirSync(this.rootPath + "/" + storyId + "/" + sceneId)
            .filter(f => fs.statSync(path.join(this.rootPath + "/" + storyId + "/" + sceneId, f))
                .isFile());
        for (let file of files) {
            try {
                file = file.substring(0, file.indexOf("."));
                if (file !== "scene") {
                    sqeuences.push(await this.getSequence(storyId, sceneId, file));
                }
            } catch (error) {
                console.log(error);
            }
        }
        return sqeuences;
    }

    async listCharacters(storyId: string): Promise<CharacterModel[]> {
        const characters: string = await this.readFile("./" + storyId + "/" + "characters" + ".json");
        return JSON.parse(characters);
    }

    async getStory(storyId: string): Promise<StoryModel> {
        const story: string = await this.readFile("./" + storyId + "/" + "story.json");
        return JSON.parse(story);
    }

    async getScene(storyId: string, sceneId: string): Promise<SceneModel> {
        const story: string = await this.readFile("./" + storyId + "/" + sceneId + "/scene.json");
        return JSON.parse(story);
    }

    async getCharacter(storyId: string, characterId: string): Promise<CharacterModel> {
        const story: string = await this.readFile("./" + storyId + "/character-" + characterId + ".json");
        return JSON.parse(story);
    }

    async getSequence(storyId: string, sceneId: string, sequenceId: string): Promise<SequenceModel> {
        const story: string = await this.readFile("./" + storyId + "/" + sceneId + "/" + sequenceId + ".json");
        const sequence: SequenceModel = JSON.parse(story);
        return sequence;
    }

    async getContext(storyId: string, contextId: string): Promise<ContextModel> {
        const story: string = await this.readFile("./" + storyId + "/context-" + contextId + ".json");
        return JSON.parse(story);
    }
}
