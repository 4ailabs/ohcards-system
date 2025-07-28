
export type ProcessPath = 'image' | 'word';

export type StepKey = 'describe_image' | 'create_story' | 'define_word' | 'combination' | 'self_connection';

export type GamePhase = 'start' | 'selecting_image' | 'selecting_word' | 'choosing_pair' | 'canvas' | 'choosing_path' | 'processing' | 'canvas_setup' | 'summary';

export interface StepDetail {
    name: string;
    prompt: string;
    placeholder: string;
}

export type StepDetails = { [key in StepKey]: StepDetail };

export type PairInputs = { [key: string]: string };
export type AllInputs = { [key: number]: PairInputs };