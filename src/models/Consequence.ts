import { ContextModel } from "./Context";
import { Condition } from "./Condition";

export class Consequence {
    type: string;
    name: string;
    bonus: Boolean;
    value: number;
    conditions: Condition[];
}