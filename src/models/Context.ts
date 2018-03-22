import { Relation } from "./Relation";
import { StoryModel } from "./Story";
import { ChapterModel } from "./Chapter";
import { SequenceModel } from "./Sequence";

export class ContextModel {
    id: string;
    relations: Relation[];
    skills: Map<String, number>;
    caractertistics: Map<String, number>;
    story: StoryModel;
    chapter: ChapterModel;
    sequence: SequenceModel;
    currentDialog: number;
}