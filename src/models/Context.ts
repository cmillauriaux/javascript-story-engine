import { Relation } from "./Relation";
import { StoryModel } from "./Story";
import { SequenceModel } from "./Sequence";
import { IPersistanceAdapter } from "../controllers/persistance-adapter";

export class ContextModel {
    id: string;
    relations: Relation[];
    skills: Map<String, number>;
    inventory: Map<String, number>;
    variables: Map<String, any>;
    story: StoryModel;
    sequence: SequenceModel;
    currentDialog: number;
}