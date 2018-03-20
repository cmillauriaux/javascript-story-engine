import { Consequence } from "./Consequence";
import { Condition } from "./Condition";

export type Choice = {
    order: number;
    title: string;
    conditions: Condition[];
    consequences: Consequence[];
};