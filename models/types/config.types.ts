export type Language = {
    id: number;
    languageName: string;
}

export type Tone = {
    id: number;
    toneName: string;
    languageId: number;
}

export type Feature = {
    id : number;
    featureName : string;
    featurePath : string;
}