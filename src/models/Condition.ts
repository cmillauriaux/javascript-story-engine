export type Condition = {};

export interface IRelationCounterCondition extends Condition {
    attribute: string;
    superior: boolean;
    equal: boolean;
    value: number;
}