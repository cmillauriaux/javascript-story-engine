export class Condition {
    type: string;
    attribute?: string;
    superior?: boolean;
    inferior?: boolean;
    exists?: boolean;
    equal?: boolean;
    not?: boolean;
    value?: number;
}