import { Relation } from "./Relation";
import { StoryModel } from "./Story";
import { SceneModel } from "./Scene";
import { SequenceModel } from "./Sequence";
import { IPersistanceAdapter } from "../controllers/persistance-adapter";

export class ContextModel {
    id: string;
    relations: Relation[];
    skills: Map<String, number>;
    inventory: Map<String, number>;
    story: StoryModel;
    scene: SceneModel;
    sequence: SequenceModel;
    currentDialog: number;
}