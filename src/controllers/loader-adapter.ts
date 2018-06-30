import { IPersistanceAdapter } from "./persistance-adapter";

export interface ILoaderAdapter {

    load(persistance: IPersistanceAdapter, args: string) : Promise<IPersistanceAdapter>;

    loadFiles(persistance: IPersistanceAdapter, args: string) : Promise<IPersistanceAdapter>;
}