import { ContextModel } from "./Context";

export interface Consequence {
    type: String;
    apply(context: ContextModel): ContextModel;
};

export class SkillConsequence implements Consequence {
    public type: String;
    private name: String;
    private bonus: Boolean;
    private value: number;
    apply(context: ContextModel): ContextModel {
        if (this.bonus) {
            context.skills.set(this.name, context.skills.get(name) + this.value);
        } else {
            context.skills.set(this.name, context.skills.get(name) - this.value);
        }
        return context;
    }
}

export class CaracteristicConsequence implements Consequence {
    public type: String;
    private name: String;
    private bonus: Boolean;
    private value: number;
    apply(context: ContextModel): ContextModel {
        if (this.bonus) {
            context.caractertistics.set(this.name, context.caractertistics.get(name) + this.value);
        } else {
            context.caractertistics.set(this.name, context.caractertistics.get(name) - this.value);
        }
        return context;
    }
}

export class RelationConsequence implements Consequence {
    public type: String;
    apply(context: ContextModel): ContextModel {
        return context;
    }
}

export class SequenceTransitionConsequence implements Consequence {
    public type: String;
    apply(context: ContextModel): ContextModel {
        return context;
    }
}