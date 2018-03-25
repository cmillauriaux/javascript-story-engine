import { StoryModel } from "../models/Story";
import { SceneModel } from "../models/Scene";
import { SequenceModel } from "../models/Sequence";
import { CharacterModel } from "../models/Character";
import { ContextModel } from "../models/Context";
import { IPersistanceAdapter } from "./persistance-adapter";
import * as Loki from "lokijs";

export class PersistanceLoki implements IPersistanceAdapter {
    private loki: Loki;
    private stories: Loki.Collection;
    private scenes: Loki.Collection;
    private sequences: Loki.Collection;
    private contexts: Loki.Collection;
    private rootPath: string;

    constructor(json: string) {
        this.loki = new Loki("story.db");
        this.loki.loadJSON(json);
        this.stories = this.loki.getCollection("stories");
        if (this.stories == null) {
            this.stories = this.loki.addCollection("stories");
        }
        this.scenes = this.loki.getCollection("scenes");
        if (this.scenes == null) {
            this.scenes = this.loki.addCollection("scenes");
        }
        this.sequences = this.loki.getCollection("sequences");
        if (this.sequences == null) {
            this.sequences = this.loki.addCollection("sequences");
        }
        this.contexts = this.loki.getCollection("contexts");
        if (this.contexts == null) {
            this.contexts = this.loki.addCollection("contexts");
        }
    }

    async listStories(): Promise<StoryModel[]> {
        return this.stories.find();
    }

    async listScenes(storyId: string): Promise<SceneModel[]> {
        return this.scenes.find({ storyId: storyId });
    }

    async listSequences(storyId: string, sceneId: string): Promise<SequenceModel[]> {
        return this.sequences.find({ storyId: storyId, sceneId: sceneId });
    }

    async listCharacters(storyId: string): Promise<CharacterModel[]> {
        return [];
    }

    async getStory(storyId: string): Promise<StoryModel> {
        return this.stories.findOne({ id: storyId });
    }

    async getScene(storyId: string, sceneId: string): Promise<SceneModel> {
        return this.scenes.findOne({ id: sceneId, storyId: storyId });
    }

    async getCharacter(storyId: string, characterId: string): Promise<CharacterModel> {
        return null;
    }

    async getSequence(storyId: string, sceneId: string, sequenceId: string): Promise<SequenceModel> {
        return this.sequences.findOne({ sceneId: sceneId, storyId: storyId, id: sequenceId });
    }

    async getContext(storyId: string, contextId: string): Promise<ContextModel> {
        return this.contexts.findOne();
    }

    /*generateTest(): void {
        const st: StoryModel = new StoryModel();
        st.id = "sample-story";
        st.title = "Sample Story";
        st.version = 22;
        st.entrypoint = "sample-scene-01";
        this.stories.insert(st);

        const sc: SceneModel = new SceneModel();
        sc.id = "sample-scene-01";
        sc.storyId = "sample-story";
        sc.title = "Sample Scene 01";
        sc.version = 8;
        sc.entrypoint = "sample-sequence-01";
        this.scenes.insert(sc);

        let seq: SequenceModel = new SequenceModel();
        seq.id = "sample-sequence-01";
        seq.storyId = "sample-story";
        seq.sceneId = "sample-scene-01";
        seq.version = 2;
        seq.background = "sample-background.jpg";
        seq.dialogs = [{
            character: "sample-character-01",
            text: "Lorem ipsum",
            foreground: ""
        },
        {
            character: "sample-character-01",
            text: "Lorem ipsum",
            foreground: ""
        },
        {
            character: "sample-character-01",
            text: "Lorem ipsum",
            foreground: ""
        }
        ];
        seq.choices = [
            {
                order: 1,
                title: "Choice 1",
                conditions: [],
                consequences: [
                    {
                        type: "SkillConsequence",
                        name: "Strength",
                        bonus: true,
                        value: 10
                    },
                    {
                        type: "SequenceTransitionConsequence",
                        name: "sample-sequence-02"
                    }
                ]
            },
            {
                order: 2,
                title: "Choice 2",
                conditions: [
                    {
                        type: "SkillCondition",
                        attribute: "Strength",
                        superior: true,
                        inferior: false,
                        exists: false,
                        equal: true,
                        value: 10
                    }
                ],
                consequences: []
            },
            {
                order: 3,
                title: "Choice 3",
                conditions: [
                    {
                        type: "InventoryCondition",
                        attribute: "Smartphone",
                        superior: false,
                        inferior: false,
                        exists: true,
                        equal: true
                    }
                ],
                consequences: []
            },
            {
                order: 4,
                title: "Choice 4",
                conditions: [],
                consequences: [
                    {
                        type: "SkillConsequence",
                        name: "Strength",
                        bonus: true,
                        value: 10
                    },
                    {
                        type: "SequenceTransitionConsequence",
                        name: "sample-sequence-02"
                    }
                ]
            }
        ];
        this.sequences.insert(seq);

        seq = new SequenceModel();
        seq.id = "sample-sequence-02";
        seq.storyId = "sample-story";
        seq.sceneId = "sample-scene-01";
        seq.version = 2;
        seq.background = "sample-background.jpg";
        seq.dialogs = [{
            character: "sample-character-01",
            text: "Lorem ipsum",
            foreground: ""
        },
        {
            character: "sample-character-01",
            text: "Lorem ipsum",
            foreground: ""
        },
        {
            character: "sample-character-01",
            text: "Lorem ipsum",
            foreground: ""
        }
        ];
        seq.choices = [
            {
                order: 1,
                title: "Choice 1",
                conditions: [],
                consequences: [
                    {
                        type: "SkillConsequence",
                        name: "Strength",
                        bonus: true,
                        value: 10
                    },
                    {
                        type: "SequenceTransitionConsequence",
                        name: "sample-sequence-02"
                    }
                ]
            },
            {
                order: 2,
                title: "Choice 2",
                conditions: [],
                consequences: []
            },
            {
                order: 3,
                title: "Choice 3",
                conditions: [],
                consequences: []
            }
        ];
        this.sequences.insert(seq);

        this.contexts.insert({
            id: "sample-context-01",
            inventory: {
                "Smartphone": 1
            }
        });

        console.log(this.loki.serialize());
    }*/
}
