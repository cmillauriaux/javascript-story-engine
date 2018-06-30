import { IPersistanceAdapter } from "./persistance-adapter";

export interface IExportAdapter {
    export(persistance: IPersistanceAdapter, storyId: string) : Promise<string>;
}