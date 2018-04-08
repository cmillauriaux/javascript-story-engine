import { Condition } from "./Condition";
import { Dialog } from "./Dialog";
import { Choice } from "./Choice";

export class SequenceModel {
    id: string;
    title: string;
    storyId: string;
    sceneId: string;
    version: number;
    background: string;
    next: Map<string, Condition>;
    dialogs: Dialog[];
    choices: Choice[];
}