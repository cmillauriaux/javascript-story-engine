import { Condition } from "./Condition";
import { Dialog } from "./Dialog";
import { Choice } from "./Choice";

export type SequenceModel = {
    id: string;
    storyId: string;
    chapterId: string;
    version: number;
    background: string;
    next: Map<string, Condition>;
    dialogs: Dialog[];
    choices: Choice[];
};