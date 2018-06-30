import { ILoaderAdapter } from "./loader-adapter";
import { IPersistanceAdapter } from "./persistance-adapter";
import * as yaml from "js-yaml";
import * as fs from "fs";
import * as path from "path";
import { StoryModel } from "../models/Story";
import { CharacterModel } from "../models/Character";

export class LoaderYML implements ILoaderAdapter {

    async loadFiles(persistance: IPersistanceAdapter, args: string): Promise<IPersistanceAdapter> {
        let docs = [];

        if (!args || !this.isFileExists(args)) {
            throw new Error("File or directory doesn't exists");
        }

        // List all files in a directory
        const files = this.listAllFile(args, []);

        // For each file, load document
        for (let file of files) {
            let doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
            if (doc) {
                docs.push(doc);
            }
        }

        return await this.loadElements(persistance, docs);
    }

    async load(persistance: IPersistanceAdapter, args: string): Promise<IPersistanceAdapter> {
        let docs = [];

        if (!args) {
            throw new Error("File or directory doesn't exists");
        }

        let doc = yaml.safeLoad(args);
        if (doc) {
            docs.push(doc);
        }

        return await this.loadElements(persistance, docs);
    }

    private async loadElements(persistance: IPersistanceAdapter, docs: object[]): Promise<IPersistanceAdapter> {
        // For each document, find a story
        let story : StoryModel;
        for (let doc of docs) {
            if (doc["story"]) {
                story = doc["story"];
                await persistance.saveStory(story);
            }
        }

        if (!story) {
            throw new Error("No story found");
        }

        // We have the story, so we can add all sequences, characters, etc.
        for (let doc of docs) {
            if (doc["characters"]) {
                for (let character of doc["characters"]) {
                    character["storyId"] = story.id
                    await persistance.saveCharacter(story.id, character);
                }
            }

            if (doc["sequences"]) {
                for (let sequence of doc["sequences"]) {
                    sequence["storyId"] = story.id
                    await persistance.saveSequence(story.id, sequence);
                }
            }

            if (doc["context"]) {
                doc["context"]["storyId"] = story.id
                await persistance.saveContext(story.id, doc["context"]);
            }
        }

        return persistance;
    }

    private listAllFile(dir: string, filelist: string[]): string[] {
        const files = fs.readdirSync(dir);
        filelist = filelist || [];
        files.forEach((file) => {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                filelist = this.listAllFile(path.join(dir, file), filelist);
            }
            else {
                filelist.push(path.join(dir, file));
            }
        });
        return filelist;
    }

    private isDirectory(path: string): boolean {
        return fs.lstatSync(path).isDirectory();
    }

    private isFileExists(path: string): boolean {
        return fs.existsSync(path);
    }
}