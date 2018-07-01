import { IExportAdapter } from "./export-adapter";
import { IPersistanceAdapter } from "./persistance-adapter";

export class ExportAlchemy implements IExportAdapter {
    async export(persistance: IPersistanceAdapter, storyId: string): Promise<string> {
        const ids: Map<string, number> = new Map<string, number>();
        const result = {
            description: "Visualisation fo story : " + storyId,
            nodes: [],
            edges: []
        }
        const sequences = await persistance.listSequences(storyId);

        // Compute ids
        let id = 0;
        for (let sequence of sequences) {
            ids.set(sequence.id, id++);
        }

        for (let sequence of sequences) {
            result.nodes.push({
                "caption": sequence.id,
                "type": "sequence",
                "id": ids.get(sequence.id),
                "choices": sequence.choices,
                "next": sequence.next
            });

            if (sequence.next) {
                for (let nextIdx in sequence.next) {
                    if (ids.get(nextIdx) && ids.get(sequence.id)) {
                        result.edges.push({
                            "source": ids.get(sequence.id),
                            "target": ids.get(nextIdx),
                            "caption": sequence.next[nextIdx].type + " " + sequence.next[nextIdx].attribute
                        })
                    }
                }
            }

            if (sequence.choices) {
                for (let choice of sequence.choices) {
                    if (choice.consequences) {
                        for (let consequence of choice.consequences) {
                            if (consequence.type === "sequence") {
                                result.edges.push({
                                    "source": ids.get(sequence.id),
                                    "target": ids.get(consequence.name),
                                    "caption": choice.title
                                })
                            }
                        }
                    }
                }
            }
        }
        return JSON.stringify(result);
    }
}