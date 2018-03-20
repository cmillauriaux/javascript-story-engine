import { Relation } from "./Relation";

export type ContextModel = {
    id: string;
    relations: Relation[];
    skills: Map<String, number>;
    caractertistics: Map<String, number>;
};