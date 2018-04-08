import { Condition } from "./Condition";

export class SceneModel {
    id: string;
    storyId: string;
    title: string;
    version: number;
    entrypoints: Map<String, Condition>;
}